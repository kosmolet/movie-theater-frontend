import React from "react";
import { useTranslation } from "react-i18next";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className="footer">
      <section className="ft-main">
        <div className="ft-main-column">
          <h2 className="ft-title">{t("footerTitles.guests")}</h2>
          <ul>
            <li>
              <a href="https://github.com/">{t("ftGuests.reservations")}</a>
            </li>
            <li>
              <a href="https://github.com/">{t("ftGuests.customerService")}</a>
            </li>
            <li>
              <a href="https://github.com/">{t("ftGuests.QA")}</a>
            </li>
            <li>
              <a href="https://github.com/">{t("ftGuests.pricing")}</a>
            </li>
            <li>
              <a href="https://github.com/">{t("ftGuests.largerGroups")}</a>
            </li>
          </ul>
        </div>
        <div className="ft-main-column">
          <h2 className="ft-title">{t("footerTitles.members")}</h2>
          <ul>
            <li>
              <a href="https://github.com/">{t("ftMembers.signIn")}</a>
            </li>
            <li>
              <a href="https://github.com/">{t("ftMembers.signUp")}</a>
            </li>
            <li>
              <a href="https://github.com/">{t("ftMembers.aboutMembership")}</a>
            </li>
          </ul>
        </div>
        <div className="ft-main-column">
          <h2 className="ft-title">{t("footerTitles.about")}</h2>
          <ul>
            <li>
              <a href="https://github.com/">{t("ftAbout.Press")}</a>
            </li>
            <li>
              <a href="https://github.com/">{t("ftAbout.Job")}</a>
            </li>
            <li>
              <a href="https://github.com/">{t("ftAbout.socialMedia")}</a>
            </li>
            <li>
              <a href="https://github.com/">{t("ftAbout.leaveFeedback")}</a>
            </li>
          </ul>
        </div>
      </section>

      <div className="social-links">
        &copy; 2020 Moviestaden
        <a
          href="https://github.com/kosmolet"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
