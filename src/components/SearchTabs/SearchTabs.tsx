import { TAdvancedFilters, TSearchMode } from "../../types/Search";
import "./SearchTabs.scss";
import "./SearchTabs.responsive.scss";

type SearchTabsProps = {
  searchMode: TSearchMode;
  searchInput: string;
  onSearchInputChange: (value: string) => void;
  onBasicSubmit: () => void;
  advancedDraft: TAdvancedFilters;
  onAdvancedChange: (field: keyof TAdvancedFilters, value: string) => void;
  onAdvancedSubmit: () => void;
  setSearchMode: (mode: TSearchMode) => void;
};

export const SearchTabs = ({
  searchMode, //  current searchmode (advanced,basic)
  searchInput, // input values
  onSearchInputChange, // update basic search input values
  onBasicSubmit, // call basic search
  advancedDraft, // advanced search values
  onAdvancedChange, // update advanced search values
  onAdvancedSubmit, // call advanced search
  setSearchMode, // toggle between searchmodes
}: SearchTabsProps) => {
  return (
    <div className="search-panel">
      <div className="search-panel__tabs directory__tabs">
        <button
          className={`directory__tab ${
            searchMode === "basic" ? "directory__tab--active" : ""
          }`}
          onClick={() => setSearchMode("basic")} // switch to basic
        >
          BASIC SEARCH
        </button>
        <button
          className={`directory__tab ${
            searchMode === "advanced" ? "directory__tab--active" : ""
          }`}
          onClick={() => setSearchMode("advanced")} // switch to advanced
        >
          ADVANCED SEARCH
        </button>
      </div>

      <div className="search-panel__body">
        {searchMode === "basic" ? (
          <div className="search-panel__basic">
            <input
              type="text"
              placeholder="John Smith"
              className="search-panel__input"
              value={searchInput}
              onChange={(e) => onSearchInputChange(e.target.value)} // update basic search values
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onBasicSubmit();
                } // call basic search on enter button press
              }}
            />
            <button
              type="button"
              className="search-panel__submit"
              onClick={onBasicSubmit} // call basic search
            >
              SEARCH
            </button>
          </div>
        ) : (
          <div className="search-panel__advanced search-panel__advanced--active">
            <div className="search-panel__row">
              <div className="search-panel__field">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="John Smith"
                  name="name"
                  value={advancedDraft.name} // update advanced search values
                  onChange={(e) => onAdvancedChange("name", e.target.value)}
                />
              </div>
            </div>
            <div className="search-panel__row">
              <div className="search-panel__field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="john.smith@leverx.com"
                  name="email"
                  value={advancedDraft.email}
                  onChange={(e) => onAdvancedChange("email", e.target.value)}
                />
              </div>
            </div>
            <div className="search-panel__row">
              <div className="search-panel__field">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Phone number"
                  name="phone"
                  value={advancedDraft.phone}
                  onChange={(e) => onAdvancedChange("phone", e.target.value)}
                />
              </div>
              <div className="search-panel__field">
                <label htmlFor="skype">Skype</label>
                <input
                  type="text"
                  id="skype"
                  placeholder="SkypeID"
                  name="skype"
                  value={advancedDraft.skype}
                  onChange={(e) => onAdvancedChange("skype", e.target.value)}
                />
              </div>
            </div>
            <div className="search-panel__row">
              <div className="search-panel__field search-panel__field--wide">
                <label htmlFor="building">Building</label>
                <select
                  id="building"
                  name="building"
                  value={advancedDraft.building}
                  onChange={(e) => onAdvancedChange("building", e.target.value)}
                >
                  <option value="any">Any</option>
                  <option value="building 1">Building 1</option>
                  <option value="building 2">Building 2</option>
                  <option value="building a">Building A</option>
                  <option value="building b">Building B</option>
                </select>
              </div>
              <div className="search-panel__field search-panel__field--narrow">
                <label htmlFor="room">Room</label>
                <input
                  type="text"
                  id="room"
                  placeholder="303.1"
                  name="room"
                  value={advancedDraft.room}
                  onChange={(e) => onAdvancedChange("room", e.target.value)}
                />
              </div>
            </div>
            <div className="search-panel__row">
              <div className="search-panel__field">
                <label htmlFor="department">Department</label>
                <select
                  id="department"
                  name="department"
                  value={advancedDraft.department}
                  onChange={(e) =>
                    onAdvancedChange("department", e.target.value)
                  }
                >
                  <option value="any">Any</option>
                  <option value="web & mobile">Web & Mobile</option>
                  <option value="web-mobile">Web & Mobile</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              className="search-panel__submit"
              onClick={onAdvancedSubmit}
            >
              SEARCH
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
