import { IUser } from "../../types/User";
import { TViewMode } from "../../types/Search";
import { isUserRemote } from "../../utils/isUserRemote";
import "./DirectoryGrid.scss";
import "./DirectoryGrid.responsive.scss";

type DirectoryGridProps = {
  users: IUser[];
  viewMode: TViewMode;
  onUserClick: (id: IUser["_id"]) => void;
};

export const DirectoryGrid = ({
  users, // user data
  viewMode, // display type
  onUserClick, // click handler
}: DirectoryGridProps) => (
  <div
    className={`directory__grid ${
      viewMode === "grid"
        ? "directory__grid--active"
        : "directory__grid--hidden"
    }`}
  >
    {users.map((user) => {
      const remote = isUserRemote(user);
      return (
        <div
          key={user._id}
          className="employee-card"
          data-id={String(user._id)}
          onClick={() => onUserClick(user._id)}
        >
          <div className="employee-card__name-row">
            <div className="employee-card__avatar-wrapper">
              <img
                src="/assets/employee.png"
                alt="employee"
                className="employee-card__avatar"
              />
              {remote ? (
                <img
                  src="/assets/home.png"
                  alt="remote-badge"
                  className="employee-card__remote-badge"
                />
              ) : null}
            </div>
            <h2 className="employee-card__name">
              {user.first_name} {user.last_name}
            </h2>
          </div>
          <div className="employee-card__meta">
            <div className="employee-card__meta-item">
              <img
                src="/assets/workbag.png"
                alt="bag icon"
                className="employee-card__meta-icon"
              />
              <span>{user.department}</span>
            </div>
            <div className="employee-card__meta-item">
              <img
                src="/assets/door.png"
                alt="door icon"
                className="employee-card__meta-icon"
              />
              <span>{user.room}</span>
            </div>
          </div>
        </div>
      );
    })}
  </div>
);
