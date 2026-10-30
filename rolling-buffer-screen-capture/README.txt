# Rolling Buffer Screen Capture

A browser-based screen capture tool that continuously records short video segments into a rolling buffer. Older segments are discarded as new ones are recorded. Individual segments can be selected and exported as a single video.

## Files

- `index.html` — The application.
- `mediabunny.cjs` — Mediabunny library, used for video remuxing.

## Usage

Keep both files in the same directory and open `index.html` in a supported Chromium-based browser (tested on Chromium 156).

Screen capture requires browser permission. The application runs locally in the browser; no server or account is required, no data moves trough the network/internet.

## Third-party software

This project includes [Mediabunny](https://github.com/Vanilagy/mediabunny) by Vanilagy.

Mediabunny is distributed under the **Mozilla Public License 2.0 (MPL-2.0)**. Its original license and copyright notices are retained in `mediabunny.cjs`.

The Mediabunny library is provided separately from this project's own code and is not relicensed under GPL.

## License

The original code in this project, excluding third-party components, is licensed under the GNU General Public License v3.0 (GPL-3.0).

See https://www.gnu.org/licenses/gpl-3.0.txt for the full license text.
