"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./NotFound.module.scss";

type NotFoundProps = {
  title?: string;
  description?: string;
  buttonLabel?: string;
};

export const NotFound = ({
  // default values for props if not provided
  title = "404 Page not found",
  description = "Sorry, we cant find that page. It might be an old link or maybe it was moved.",
  buttonLabel = "GO TO THE HOME PAGE",
}: NotFoundProps) => {
  const router = useRouter();
  const goHome = () => {
    router.push("/");
  };
  return (
    <div className={styles["profile-error"]}>
      <div className={styles["profile-error__content"]}>
        <Image
          src="/assets/notfoundpicture.png"
          alt="notfound"
          className={styles["profile-error__image"]}
          width={400}
          height={400}
        />
        <h1>{title}</h1>
        <p>{description}</p>
        <button
          className={styles["profile-error__home-button"]}
          type="button"
          onClick={goHome}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

