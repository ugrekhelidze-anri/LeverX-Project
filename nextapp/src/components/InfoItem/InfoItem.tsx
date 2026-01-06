"use client";
import styles from "@/app/(protected)/users/[id]/page.module.scss";
import Image from "next/image";

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
  const fieldClassName = `
    ${styles["user-profile__field"]}
    ${link ? styles["user-profile__field--link"] : ""}
    ${editable ? styles["user-profile__field--editable"] : ""}
  `;

  return (
    <div
      className={`
        ${styles["user-profile__section-item"]}
        ${isLast ? styles["user-profile__section-item--last"] : ""}
      `}
    >
      <Image
        src={icon}
        alt={label.toLowerCase()}
        className={styles["user-profile__section-icon"]}
        width={24}
        height={24}
      />

      <div className={styles["user-profile__section-content"]}>
        <span className={styles["user-profile__section-label"]}>{label}:</span>

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
            className={styles["user-profile__field"]}
            data-field={dataField}
            value={hiddenValue}
            readOnly
          />
        )}
      </div>
    </div>
  );
};
