import styles from "@/app/(protected)/users/[id]/page.module.scss";

type UserSectionProps = {
  title: string;
  children: React.ReactNode;
};

export const UserSection = ({ title, children }: UserSectionProps) => {
  return (
    <section className={styles["user-profile__section"]}>
      <h2 className={styles["user-profile__section-title"]}>{title}</h2>
      {children}
    </section>
  );
};
