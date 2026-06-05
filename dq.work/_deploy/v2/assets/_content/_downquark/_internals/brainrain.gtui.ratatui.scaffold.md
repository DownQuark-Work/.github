«««
METADATA: nested page metadata
Title: Rust Ratatui Scaffold Reference
Author: @mlnck
created: 1694997815138
edited: 1694997815139
»»»

<details><summary>(G|T)UI BrainRain :: Rust Ratatui :: Directory Scaffold</summary>

## The Structure
> There will almost certainly be efficiencies / ideas / implemenations that are better than anything to be created by recreating the entire wheel

---

## GitHub & Docs
- https://github.com/ratatui/ratatui
- https://ratatui.rs/tutorials/hello-ratatui/

> ![IMPORTANT]
> Be sure to view the `Ratatui Templates` contained _**AFTER**_  the **architecture examples** below

## Architecture Examples
> Make sure to view the _more better_ Component Based Example below the first one.

## Non-Component Based
**Here's a practical, mid-level architecture example** for a Ratatui TUI that demonstrates:

- Application state management (`App` struct)
- Event-driven loop (keyboard + tick events)
- Background subprocess execution (e.g., running a shell command like `df -h` or any bash tool)
- Communication via `tokio::sync::mpsc` channel
- Clean terminal setup/teardown

### Project Setup (`Cargo.toml`)

```toml
[package]
name = "my-tui"
version = "0.1.0"
edition = "2021"

[dependencies]
ratatui = { version = "0.29", features = ["crossterm"] }  # Check latest on crates.io
crossterm = { version = "0.28", features = ["event-stream"] }
tokio = { version = "1", features = ["full"] }
color-eyre = "0.6"   # Nice error/panic handling with terminal restore
```

### Main Structure (`src/main.rs`)

```rust
use color_eyre::Result;
use crossterm::event::{self, Event as CrosstermEvent, KeyCode, KeyEvent, KeyEventKind};
use ratatui::{
    backend::CrosstermBackend,
    layout::{Constraint, Direction, Layout},
    style::{Color, Style},
    widgets::{Block, Borders, Paragraph},
    Frame, Terminal,
};
use std::time::{Duration, Instant};
use tokio::sync::mpsc;

#[derive(Debug)]
enum AppEvent {
    Key(KeyEvent),
    Tick,
    CommandOutput(String),   // Data from subprocess
    CommandError(String),
}

#[derive(Default)]
struct App {
    should_quit: bool,
    output: String,          // Display area for command results
    status: String,          // e.g., "Running command..." or "Ready"
    last_update: Instant,
}

impl App {
    fn new() -> Self {
        Self {
            last_update: Instant::now(),
            ..Default::default()
        }
    }

    fn handle_event(&mut self, event: AppEvent) {
        match event {
            AppEvent::Key(key) => self.handle_key(key),
            AppEvent::Tick => {
                // Periodic UI refresh logic if needed
            }
            AppEvent::CommandOutput(out) => {
                self.output = out;
                self.status = "Command completed".to_string();
            }
            AppEvent::CommandError(err) => {
                self.output = err;
                self.status = "Command failed".to_string();
            }
        }
    }

    fn handle_key(&mut self, key: KeyEvent) {
        if key.kind != KeyEventKind::Press {
            return;
        }
        match key.code {
            KeyCode::Char('q') | KeyCode::Esc => self.should_quit = true,
            KeyCode::Char('r') => {
                // Trigger refresh command
                self.status = "Running command...".to_string();
                // The actual spawning happens in the main loop / background
            }
            _ => {}
        }
    }

    fn draw(&self, frame: &mut Frame) {
        let area = frame.area();
        let chunks = Layout::default()
            .direction(Direction::Vertical)
            .constraints([
                Constraint::Length(3),  // Status bar
                Constraint::Min(10),    // Main output
                Constraint::Length(3),  // Help
            ])
            .split(area);

        // Status bar
        let status = Paragraph::new(self.status.as_str())
            .block(Block::default().borders(Borders::ALL).title("Status"));
        frame.render_widget(status, chunks[0]);

        // Main content
        let output = Paragraph::new(self.output.as_str())
            .block(Block::default().borders(Borders::ALL).title("Command Output"))
            .style(Style::default().fg(Color::White));
        frame.render_widget(output, chunks[1]);

        // Help
        let help = Paragraph::new("r = Run command • q = Quit")
            .block(Block::default().borders(Borders::ALL));
        frame.render_widget(help, chunks[2]);
    }
}

// Background task for running subprocesses
async fn run_command(tx: mpsc::UnboundedSender<AppEvent>, cmd: &str) {
    let output = tokio::process::Command::new("sh")
        .arg("-c")
        .arg(cmd)
        .output()
        .await;

    match output {
        Ok(out) if out.status.success() => {
            let text = String::from_utf8_lossy(&out.stdout).to_string();
            let _ = tx.send(AppEvent::CommandOutput(text));
        }
        Ok(out) => {
            let err = format!(
                "Failed ({}): {}",
                out.status,
                String::from_utf8_lossy(&out.stderr)
            );
            let _ = tx.send(AppEvent::CommandError(err));
        }
        Err(e) => {
            let _ = tx.send(AppEvent::CommandError(e.to_string()));
        }
    }
}

#[tokio::main]
async fn main() -> Result<()> {
    color_eyre::install()?;

    // Terminal setup
    let mut terminal = ratatui::init();
    let result = run_app(&mut terminal).await;

    // Always restore terminal
    ratatui::restore();
    result
}

async fn run_app(terminal: &mut Terminal<CrosstermBackend<std::io::Stdout>>) -> Result<()> {
    let mut app = App::new();

    // Event channel
    let (event_tx, mut event_rx) = mpsc::unbounded_channel::<AppEvent>();

    // Spawn event handler task (keyboard + tick)
    let tick_tx = event_tx.clone();
    tokio::spawn(async move {
        let mut interval = tokio::time::interval(Duration::from_millis(250));
        loop {
            tokio::select! {
                _ = interval.tick() => {
                    let _ = tick_tx.send(AppEvent::Tick);
                }
                event = crossterm::event::read() => {
                    if let Ok(CrosstermEvent::Key(key)) = event {
                        let _ = tick_tx.send(AppEvent::Key(key));
                    }
                }
            }
        }
    });

    // Example: auto-run a command on startup
    let cmd_tx = event_tx.clone();
    tokio::spawn(async move {
        run_command(cmd_tx, "df -h").await;
    });

    loop {
        // Draw
        terminal.draw(|frame| app.draw(frame))?;

        // Handle events
        if let Some(event) = event_rx.recv().await {
            app.handle_event(event);

            if app.should_quit {
                break;
            }

            // Example: Re-run command on key press (triggered from handle_key)
            if app.status == "Running command..." {
                let cmd_tx = event_tx.clone();
                tokio::spawn(async move {
                    run_command(cmd_tx, "df -h && echo '\n---\n' && ls -lh ~").await;
                });
            }
        }
    }

    Ok(())
}
```

### Key Architecture Highlights

1. **State Management** — Everything lives in the `App` struct. `handle_event` is the single place where state mutates.

2. **Event System** — `AppEvent` enum unifies keyboard, ticks, and background results. `tokio::sync::mpsc` makes cross-task communication easy and safe.

3. **Subprocess Handling** — `tokio::process::Command` runs asynchronously without blocking the UI thread. Results are sent back via the channel.

4. **Immediate Mode Rendering** — On every loop iteration, `draw()` rebuilds the entire view from current state.

5. **Error Handling & Cleanup** — `color-eyre` + explicit `ratatui::restore()` ensures the terminal doesn't get left in a broken state.

### Scaling This Up

- **Multiple components** → Use the **Component trait** pattern (see Ratatui templates) for tabs, modals, etc.
- **More complex state** → Add enums for screens/modes, or use a Flux/Redux-like action dispatcher.
- **Many background tasks** → Spawn workers that send updates to the same channel.
- **Real bash reuse** → Call complex scripts: `run_command(..., "path/to/my_script.sh --args")`.

This should compile and run (`cargo run`). Press `r` to trigger refreshes, `q` to quit.

Would you like me to expand this with:
- Tables / Lists for dynamic data?
- A specific command relevant to your use case?
- Component-based architecture instead?
- Async input handling improvements?

Just let me know!

---

## More Better Component Based Example

**Yes — here's a cleaner, more scalable component-based architecture** for a Ratatui TUI. This follows the official recommended patterns from the Ratatui component template and documentation.

### Core Idea
- Each UI section is its own **Component** (a struct + trait implementation).
- Components encapsulate: **state**, **event handling**, **updates**, and **rendering**.
- The main `App` orchestrates components, layout, and global events.
- This makes it easy to add tabs, modals, side panels, etc.

### `Cargo.toml` (same as before, plus any extras)

```toml
[dependencies]
ratatui = { version = "0.29", features = ["crossterm"] }
crossterm = { version = "0.28", features = ["event-stream"] }
tokio = { version = "1", features = ["full"] }
color-eyre = "0.6"
```

### Key Files / Structure

#### 1. `src/components/mod.rs` + Trait Definition

```rust
// src/components/mod.rs
use color_eyre::eyre::Result;
use crossterm::event::{KeyEvent, MouseEvent};
use ratatui::layout::Rect;
use ratatui::Frame;

pub trait Component {
    fn init(&mut self) -> Result<()> {
        Ok(())
    }

    fn handle_events(&mut self, event: Option<AppEvent>) -> Option<AppEvent> {
        // Default: pass through or handle locally
        event
    }

    fn update(&mut self, action: Option<AppEvent>) -> Option<AppEvent> {
        action
    }

    fn draw(&mut self, frame: &mut Frame, area: Rect);
}

#[derive(Debug, Clone, PartialEq)]
pub enum AppEvent {
    Key(KeyEvent),
    Tick,
    CommandOutput(String),
    CommandError(String),
    Quit,
    // Add more as needed: Resize, Mouse, etc.
}
```

#### 2. Example Component: `CommandOutput`

```rust
// src/components/command_output.rs
use super::{AppEvent, Component};
use color_eyre::eyre::Result;
use ratatui::{
    layout::Rect,
    style::{Color, Style},
    widgets::{Block, Borders, Paragraph},
    Frame,
};

#[derive(Default)]
pub struct CommandOutput {
    pub output: String,
    pub status: String,
}

impl Component for CommandOutput {
    fn handle_events(&mut self, event: Option<AppEvent>) -> Option<AppEvent> {
        match event {
            Some(AppEvent::CommandOutput(out)) => {
                self.output = out;
                self.status = "✓ Completed".to_string();
                None
            }
            Some(AppEvent::CommandError(err)) => {
                self.output = err;
                self.status = "✗ Failed".to_string();
                None
            }
            other => other,
        }
    }

    fn draw(&mut self, frame: &mut Frame, area: Rect) {
        let chunks = ratatui::layout::Layout::default()
            .direction(ratatui::layout::Direction::Vertical)
            .constraints([ratatui::layout::Constraint::Length(3), ratatui::layout::Constraint::Min(10)])
            .split(area);

        let status = Paragraph::new(self.status.as_str())
            .block(Block::default().borders(Borders::ALL).title("Status"));

        let output = Paragraph::new(self.output.as_str())
            .block(Block::default().borders(Borders::ALL).title("Output"))
            .style(Style::default().fg(Color::White));

        frame.render_widget(status, chunks[0]);
        frame.render_widget(output, chunks[1]);
    }
}
```

#### 3. Main `App` (`src/app.rs`)

```rust
// src/app.rs
use crate::components::{command_output::CommandOutput, AppEvent, Component};
use color_eyre::Result;
use ratatui::{backend::CrosstermBackend, layout::{Constraint, Direction, Layout}, Frame, Terminal};
use std::time::Duration;
use tokio::sync::mpsc;

pub struct App {
    pub command_output: CommandOutput,
    pub should_quit: bool,
    event_tx: mpsc::UnboundedSender<AppEvent>,
}

impl App {
    pub fn new(event_tx: mpsc::UnboundedSender<AppEvent>) -> Self {
        Self {
            command_output: CommandOutput::default(),
            should_quit: false,
            event_tx,
        }
    }

    pub fn handle_event(&mut self, event: AppEvent) {
        let next = self.command_output.handle_events(Some(event));

        if let Some(next) = next {
            match next {
                AppEvent::Key(key) => self.handle_key(key),
                AppEvent::Quit => self.should_quit = true,
                _ => {}
            }
        }
    }

    fn handle_key(&mut self, key: crossterm::event::KeyEvent) {
        if key.kind != crossterm::event::KeyEventKind::Press {
            return;
        }
        match key.code {
            crossterm::event::KeyCode::Char('q') | crossterm::event::KeyCode::Esc => {
                let _ = self.event_tx.send(AppEvent::Quit);
            }
            crossterm::event::KeyCode::Char('r') => {
                self.run_command("df -h && echo '\n---\n' && ls -lh ~");
            }
            _ => {}
        }
    }

    fn run_command(&self, cmd: &str) {
        let tx = self.event_tx.clone();
        let cmd = cmd.to_string();
        tokio::spawn(async move {
            let output = tokio::process::Command::new("sh")
                .arg("-c")
                .arg(cmd)
                .output()
                .await;

            match output {
                Ok(o) if o.status.success() => {
                    let text = String::from_utf8_lossy(&o.stdout).to_string();
                    let _ = tx.send(AppEvent::CommandOutput(text));
                }
                Ok(o) => {
                    let err = format!("Failed: {}", String::from_utf8_lossy(&o.stderr));
                    let _ = tx.send(AppEvent::CommandError(err));
                }
                Err(e) => {
                    let _ = tx.send(AppEvent::CommandError(e.to_string()));
                }
            }
        });
    }

    pub fn draw(&mut self, frame: &mut Frame) {
        let area = frame.area();
        let chunks = Layout::default()
            .direction(Direction::Vertical)
            .constraints([
                Constraint::Percentage(100), // Main area
            ])
            .split(area);

        self.command_output.draw(frame, chunks[0]);
    }
}
```

#### 4. Main Loop (`src/main.rs`)

```rust
use color_eyre::Result;
use crossterm::event::{self, Event as CrosstermEvent, KeyEventKind};
use ratatui::prelude::*;
use std::time::Duration;
use tokio::sync::mpsc;

mod app;
mod components;

use app::App;
use components::AppEvent;

#[tokio::main]
async fn main() -> Result<()> {
    color_eyre::install()?;
    let mut terminal = ratatui::init();

    let (event_tx, mut event_rx) = mpsc::unbounded_channel();
    let mut app = App::new(event_tx.clone());

    // Background event reader + tick
    let tx = event_tx.clone();
    tokio::spawn(async move {
        let mut interval = tokio::time::interval(Duration::from_millis(250));
        loop {
            tokio::select! {
                _ = interval.tick() => { let _ = tx.send(AppEvent::Tick); }
                ev = event::read() => {
                    if let Ok(CrosstermEvent::Key(key)) = ev {
                        if key.kind == KeyEventKind::Press {
                            let _ = tx.send(AppEvent::Key(key));
                        }
                    }
                }
            }
        }
    });

    // Initial command
    app.run_command("df -h");

    loop {
        terminal.draw(|f| app.draw(f))?;

        if let Some(event) = event_rx.recv().await {
            app.handle_event(event);
            if app.should_quit {
                break;
            }
        }
    }

    ratatui::restore();
    Ok(())
}
```

### Advantages of This Architecture
- **Modularity** — Add new components (e.g., `Sidebar`, `TableView`, `Modal`) without touching the main loop.
- **Composability** — Components can contain other components.
- **Testability** — Easy to unit-test individual components.
- **Scalability** — Works well for complex apps with multiple screens/tabs.

This is very close to the official Ratatui component template. For even more polish, I recommend generating the full template:

```bash
cargo install cargo-generate
cargo generate --git https://github.com/ratatui/templates component --name my-tui
```

Would you like me to expand this with:
- A second component (e.g., a selectable list or tabs)?
- Focus management between components?
- Error handling / logging improvements?
- Or help integrating a specific feature from your original bash TUI?

Let me know!

---

## Ratatui Tempaltes

**Ratatui Templates** are official starter projects that use `cargo-generate` to quickly bootstrap a new Rust TUI application. They are maintained in the [ratatui/templates](https://github.com/ratatui/templates) repository and are the recommended way to start a new project.

### How to Use Them

```bash
# 1. Install the generator (one-time)
cargo install cargo-generate

# 2. Generate a new project
cargo generate ratatui/templates
```

You’ll be prompted to choose a sub-template and provide a project name. This sets up a complete, runnable Cargo project with sensible defaults.

### Available Templates (as of 2026)

- **hello-world** — Minimal "Hello, World!" example. Great for experimentation.
- **simple** — Basic synchronous starter kit.
- **simple-async** — Simple version with Tokio async support.
- **event-driven** / **event-driven-async** — Focus on clean event loops and handling.
- **component** — Most advanced/opinionated template. Uses a `Component` trait for modular architecture (this is what we were building toward in previous examples).

There are also `-generated` folders in the repo that show what the output looks like.

### Component Template (Recommended for Mid-to-Large Apps)

This is the one most aligned with your earlier request for **component-based architecture**. It is production-oriented and includes:

**Key Features:**
- Tokio for async events and background tasks.
- Component trait (`handle_events`, `update`, `draw`, etc.) with examples like `Home` and `Fps`.
- Excellent error handling (`color-eyre`, `better-panic`, `human-panic`).
- Logging with `tracing`.
- Clap for CLI args (tick rate, frame rate, etc.).
- Suspend/resume support (e.g., shelling out to `vim` or other TUIs).
- Config/data directories with `dirs` crate.
- Pre-commit hooks, Justfile, etc.

**Generation command:**
```bash
cargo generate ratatui/templates component --name my-tui-app
```

The template is highly customizable — you’re encouraged to pick and choose pieces rather than use it rigidly.

### Why Use a Template?

- Saves hours of boilerplate (terminal init/restore, event loop, graceful shutdown).
- Consistent structure across projects.
- Includes best practices for macOS/Linux/Windows compatibility.
- Easy to extend with your subprocess calls (as in previous examples).

### Other Resources

- Official docs: [https://ratatui.rs/templates/](https://ratatui.rs/templates/)
- Component template deep-dive: [https://ratatui.rs/templates/component/](https://ratatui.rs/templates/component/)
- Full repo: [github.com/ratatui/templates](https://github.com/ratatui/templates)
- Awesome Ratatui (showcase of real apps): [github.com/ratatui/awesome-ratatui](https://github.com/ratatui/awesome-ratatui)
