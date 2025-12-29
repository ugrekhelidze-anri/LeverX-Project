import { IUser } from "../../types/User";
import { TViewMode } from "../../types/Search";
import { isUserRemote } from "../../utils/isUserRemote";
import "./DirectoryList.scss";
import "./DirectoryList.responsive.scss";

type DirectoryListProps = {
  users: IUser[];
  viewMode: TViewMode;
  onUserClick: (id: IUser["_id"]) => void;
};

export const DirectoryList = ({
  users, // user data
  viewMode, // display type
  onUserClick, // click handler
}: DirectoryListProps) => (
  <div
    className={`directory__list employee-table ${
      viewMode === "list" ? "directory__list--active" : ""
    }`}
  >
    <div className="employee-table__header">
      <div className="employee-table__header-photo">
        <span>Photo</span>
      </div>
      <div className="employee-table__header-name">
        <span>Name</span>
      </div>
      <div className="employee-table__header-department">
        <span>Department</span>
      </div>
      <div className="employee-table__header-room">
        <span>Room</span>
      </div>
    </div>
    <div className="employee-table__rows">
      {users.map((user) => {
        // if user is remote display home icon
        const remote = isUserRemote(user);
        return (
          <div
            key={user._id}
            className="employee-table__row"
            data-id={String(user._id)}
            onClick={() => onUserClick(user._id)}
          >
            <div className="employee-table__avatar-wrapper">
              <img
                src="/assets/employee.png"
                alt="employee"
                className="employee-table__avatar"
              />
              {remote ? (
                <img
                  src="/assets/home.png"
                  alt="remote-badge"
                  className="employee-table__remote-badge"
                />
              ) : null}
            </div>
            <span className="employee-table__name">
              {user.first_name} {user.last_name}
            </span>
            <span className="employee-table__department">
              {user.department}
            </span>
            <span className="employee-table__room">{user.room}</span>
          </div>
        );
      })}
    </div>
  </div>
);
