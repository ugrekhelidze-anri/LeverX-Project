import { TViewMode } from "../../types/Search";
import "./ViewToggle.scss";
import "./ViewToggle.responsive.scss";

type ViewToggleProps = {
  employeesCount: number;
  onChange: (mode: TViewMode) => void;
};

export const ViewToggle = ({
  employeesCount, // number of employees
  onChange, // button handler
}: ViewToggleProps) => (
  <div className="directory__toolbar-views">
    <p className="directory__toolbar-count">
      {employeesCount} employees displayed
    </p>
    <div className="directory__toolbar-buttons">
      <button
        type="button"
        className="directory__view-btn"
        id="grid-view-btn"
        data-view="grid"
        onClick={() => onChange("grid")} // change to grid view
      >
        <img src="/assets/gridicon.png" alt="grid view" />
      </button>
      <button
        type="button"
        className="directory__view-btn"
        id="list-view-btn"
        data-view="list"
        onClick={() => onChange("list")} // change to row view
      >
        <img src="/assets/rowsicon.png" alt="list view" />
      </button>
    </div>
  </div>
);
