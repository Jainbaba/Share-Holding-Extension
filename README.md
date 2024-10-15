# TradingView Stock API Runner

## Description

TradingView Stock API Runner is a Chrome extension that fetches and displays stock information from TradingView and an external API. It provides users with quick access to shareholding pattern data for various stocks directly from their browser.

## Features

- Automatically detects the current stock being viewed on TradingView
- Fetches and displays shareholding pattern data for the detected stock
- Presents data in an easy-to-read table format
- Responsive design for various screen sizes

## Installation

To install this Chrome extension:

1. Clone this repository or download it as a ZIP file and extract it to a local directory.

2. Open Google Chrome and navigate to `chrome://extensions/`.

3. Enable "Developer mode" by toggling the switch in the top right corner.

4. Click on "Load unpacked" button in the top left corner.

5. Select the directory containing the extension files (the folder with `manifest.json`).

6. The extension should now appear in your list of installed extensions.

## Usage

1. Navigate to a stock page on TradingView (e.g., https://www.tradingview.com/chart/?symbol=NSE:RELIANCE).

2. Click on the extension icon in your Chrome toolbar.

3. The extension popup will open, displaying the current stock name and its shareholding pattern data (if available).

## Project Structure

- `manifest.json`: Contains extension metadata and permissions
- `popup.html`: The HTML structure for the extension popup
- `popup.js`: JavaScript file handling the main functionality
- `data/`: Directory containing CSV files with shareholding pattern data
- `symbol_info/`: Directory containing JSON files with stock symbol information

## Development

To modify or extend the extension:

1. Edit the relevant files (`popup.html`, `popup.js`, etc.) using your preferred code editor.

2. After making changes, go to `chrome://extensions/` in Chrome.

3. Find the TradingView Stock API Runner extension and click the "Reload" button.

4. Your changes should now be reflected in the extension.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT]

