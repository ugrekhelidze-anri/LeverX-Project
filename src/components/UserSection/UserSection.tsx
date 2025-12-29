type UserSectionProps = {
  title: string;
  children: React.ReactNode;
};

export const UserSection = ({ title, children }: UserSectionProps) => {
  return (
    <section className="user-profile__section">
      <h2 className="user-profile__section-title">{title}</h2>
      {children}
    </section>
  );
};
