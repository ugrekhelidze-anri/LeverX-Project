"use client";

type InfoItemProps = {
  icon: string;
  label: string;
  value: string | number;
  editable?: boolean;
  link?: boolean;
  onChange?: (value: string) => void;
  dataField?: string;
  readOnly?: boolean;
  isLast?: boolean;
  hiddenValue?: string;
  inputType?: string;
};

export const InfoItem = ({
  icon, // icon to display
  label, // label
  value, // values
  editable = false, // if editable default is false
  link = false, // if link default is false
  onChange, // onchange callback
  dataField, // data field prop
  readOnly = false, // if read only default is false
  isLast = false, // if last item
  hiddenValue, // hidden value
  inputType = "text", // input type, default to text
}: InfoItemProps) => {
  const fieldClassName = `user-profile__field ${
    link ? "user-profile__field--link" : ""
  } ${editable ? "user-profile__field--editable" : ""}`;

  return (
    <div
      className={`user-profile__section-item ${
        isLast ? "user-profile__section-item--last" : ""
      }`}
    >
      <img
        src={icon}
        alt={label.toLowerCase()}
        className="user-profile__section-icon"
      />
      <div className="user-profile__section-content">
        <span className="user-profile__section-label">{label}:</span>
        <input
          type={inputType}
          className={fieldClassName}
          data-field={dataField}
          value={value}
          readOnly={readOnly || !editable}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        />
        {hiddenValue && (
          <input
            type="hidden"
            className="user-profile__field"
            data-field={dataField}
            value={hiddenValue}
            readOnly
          />
        )}
      </div>
    </div>
  );
};

