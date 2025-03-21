const SearchBar = () => {
  return (
    <div
      className="sticky inset-x-0 top-0 flex shrink-0 items-start justify-between py-1 text-12 font-medium text-grey-11"
      style={{ zIndex: 5, paddingLeft: "48px", paddingRight: "48px" }}>
      <div className="flex w-full justify-between pb-2 md:pb-3">
        <div className="m-0 box-border flex w-full items-center justify-between p-0 md:max-w-screen-sm">
          <div className="flex grow justify-end md:justify-start">
            <div
              className="-mb-2 h-10 flex-1 md:h-12"
              data-testid="SEARCH_CONTAINER">
              <div data-reach-combobox="" data-state="idle">
                <div
                  data-testid="SEARCH_INPUT_CONTAINER"
                  className="group/search-input-container relative flex h-10 items-center rounded md:-mt-1 md:h-12"
                  data-protonpass-form="">
                  <svg
                    className="absolute text-grey-9 md:top-3 [&>path]:stroke-[2.5] top-2"
                    style={{ left: "8px", width: "24px", height: "24px" }}
                    fill="currentColor"
                    aria-hidden="true"
                    viewBox="0 0 32 32">
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21.06l6.49 6.49M14.15 4.8a9.4 9.4 0 109.4 9.4 9.4 9.4 0 00-9.4-9.4z"
                    />
                  </svg>
                  <input
                    aria-autocomplete="both"
                    aria-controls="listbox--1"
                    aria-expanded="false"
                    aria-haspopup="listbox"
                    role="combobox"
                    data-testid="SEARCH_INPUT"
                    placeholder="Search board"
                    className="h-10 w-full rounded border py-2.5 text-16 text-grey-12 placeholder-grey-9 outline-none transition md:h-[initial] group-hover/search-input-container:[&:not(:focus)]:shadow-[0_0_0_3px] group-hover/search-input-container:[&:not(:focus)]:shadow-grey-4 border-grey-5"
                    style={{
                      paddingLeft: "40px",
                      paddingRight: "8px",
                      transition:
                        "padding 250ms, border-top-right-radius 250ms, border-top-left-radius 250ms",
                    }}
                    data-reach-combobox-input=""
                    data-state="idle"
                    value=""
                  />
                  <div
                    className="absolute flex items-center md:top-[initial] top-2"
                    style={{ right: "8px", opacity: 0, pointerEvents: "none" }}>
                    <div className="items-center pointer-events-none opacity-0 hidden">
                      <button
                        className="relative flex shrink-0 items-center justify-center rounded font-semibold transition-colors hover:no-underline disabled:cursor-not-allowed disabled:bg-grey-3 disabled:text-grey-12 border-0 bg-transparent h-6 px-2 text-12 text-grey-11 hover:bg-grey-4 active:bg-grey-4 cursor-pointer"
                        type="button"
                        data-testid="CLEAR_SEARCH_TEXT_BTN">
                        Clear
                      </button>
                      <div className="mx-2 h-4 w-px bg-grey-7" />
                    </div>
                    <button
                      className="relative flex shrink-0 items-center justify-center rounded font-semibold transition-colors hover:no-underline disabled:cursor-not-allowed disabled:bg-grey-3 disabled:text-grey-12 h-6 w-6 px-0 text-12 border-0 bg-transparent text-grey-11 hover:bg-grey-4 active:bg-grey-4 cursor-pointer"
                      type="button"
                      data-testid="SEARCH_CLOSE">
                      <span
                        style={{
                          position: "absolute",
                          border: 0,
                          width: "1px",
                          height: "1px",
                          padding: 0,
                          margin: "-1px",
                          overflow: "hidden",
                          clip: "rect(0, 0, 0, 0)",
                          whiteSpace: "nowrap",
                          wordWrap: "normal",
                        }}>
                        Close search
                      </span>
                      <svg
                        className="block h-4 w-4"
                        fill="currentColor"
                        aria-hidden="true"
                        viewBox="0 0 32 32">
                        <path d="M7.23 7.23a1.63 1.63 0 012.31 0L16 13.69l6.46-6.46a1.63 1.63 0 112.31 2.31L18.31 16l6.46 6.46a1.63 1.63 0 11-2.31 2.31L16 18.31l-6.46 6.46a1.63 1.63 0 11-2.31-2.31L13.69 16 7.23 9.54a1.63 1.63 0 010-2.31z" />
                      </svg>
                    </button>
                  </div>
                  <div
                    className="shortcutsInfo pointer-events-none absolute hidden md:group-hover/search-input-container:flex"
                    style={{ right: "8px" }}
                    id="#shortcutsInfo">
                    <div className="pointer-events-none flex gap-0.5">
                      <div className="pointer-events-none flex min-h-[20px] w-fit min-w-[20px] items-center justify-center rounded bg-grey-2 px-1 text-12 uppercase text-grey-11">
                        ctrl
                      </div>
                      <div className="pointer-events-none flex min-h-[20px] w-fit min-w-[20px] items-center justify-center rounded bg-grey-2 px-1 text-12 uppercase text-grey-11">
                        P
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ml-2">
            <button
              className="relative flex shrink-0 items-center justify-center rounded font-semibold transition-colors hover:no-underline disabled:cursor-not-allowed disabled:bg-grey-3 disabled:text-grey-12 border-0 bg-transparent h-10 text-14 text-grey-11 hover:bg-grey-4 active:bg-grey-4 px-2.5 cursor-pointer"
              type="button"
              data-testid="NEW_FILTERS_BUTTON"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="radix-:R2aqqoq6:"
              data-state="closed">
              <svg
                className="size-5"
                fill="currentColor"
                aria-hidden="true"
                viewBox="0 0 32 32">
                <path d="M10.49 26.9a5 5 0 01-4.76-3.82h-1.5a1.18 1.18 0 110-2.36h1.5a5 5 0 014.76-3.82 5 5 0 014.75 3.82h12.58a1.18 1.18 0 010 2.36H15.24a5 5 0 01-4.75 3.82zM8 21.9a2.62 2.62 0 002.54 2.64 2.64 2.64 0 000-5.28A2.62 2.62 0 008 21.9zm13.56-6.8a5 5 0 01-4.75-3.82H4.18a1.18 1.18 0 010-2.36h12.58a5 5 0 014.75-3.82 5 5 0 014.76 3.82h1.5a1.18 1.18 0 110 2.36h-1.5a5 5 0 01-4.76 3.82zm-2.56-5a2.54 2.54 0 102.53-2.64A2.62 2.62 0 0019 10.1z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="flex shrink-0">
        <button
          className="relative flex shrink-0 items-center justify-center rounded font-semibold transition-colors hover:no-underline disabled:cursor-not-allowed disabled:bg-grey-3 disabled:text-grey-12 h-10 w-10 px-0 text-16 border border-grey-5 bg-grey-3 text-grey-11 hover:bg-grey-4 active:bg-grey-4 cursor-pointer"
          type="button"
          data-testid="share_button">
          <span
            style={{
              position: "absolute",
              border: 0,
              width: "1px",
              height: "1px",
              padding: 0,
              margin: "-1px",
              overflow: "hidden",
              clip: "rect(0, 0, 0, 0)",
              whiteSpace: "nowrap",
              wordWrap: "normal",
            }}>
            Share
          </span>
          <svg
            className="block h-5 w-5"
            fill="currentColor"
            aria-hidden="true"
            viewBox="0 0 32 32">
            <path d="M25.16 6.84a5.08 5.08 0 00-7.16 0l-2.74 2.74a5.08 5.08 0 000 7.16 1.17 1.17 0 010 1.67 1.18 1.18 0 01-1.67 0 7.44 7.44 0 010-10.5l2.74-2.74a7.42 7.42 0 0110.5 10.5L24 18.48a1.18 1.18 0 01-1.67-1.67L25.16 14a5.08 5.08 0 000-7.16zM9.65 13.52a1.18 1.18 0 010 1.67L6.84 18A5.06 5.06 0 0014 25.16l2.74-2.74a5.08 5.08 0 000-7.16 1.17 1.17 0 010-1.67 1.18 1.18 0 011.67 0 7.44 7.44 0 010 10.5l-2.74 2.74a7.42 7.42 0 01-10.5-10.5L8 13.52a1.18 1.18 0 011.65 0z" />
          </svg>
        </button>
        <button
          className="relative flex shrink-0 items-center justify-center rounded font-semibold transition-colors hover:no-underline disabled:cursor-not-allowed disabled:bg-grey-3 disabled:text-grey-12 border-0 h-10 px-3 text-14 bg-blue-9 text-white hover:bg-blue-10 hover:text-white active:bg-blue-10 ml-3 cursor-pointer"
          type="button"
          data-testid="PUBLIC_BOARD_DOWNLOAD_MENU_TRIGGER"
          id="radix-:R2iqqoq6:"
          aria-haspopup="menu"
          aria-expanded="false"
          data-state="closed">
          Save to...
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
