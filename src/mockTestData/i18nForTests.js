import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "cimode",
  fallbackLng: "en",

  ns: ["translations"],
  defaultNS: "translations",

  debug: true,

  resources: {
    en: {
      translations: {
        titleMovieRow: {
          nowInTheater: "Movies Now",
          commingSoon: "Upcoming movies",
          retro: "Retrospective",
          family: "Family",
          found: "Search result",
          news: "News from Moviestaden",
          toplist: "Top rated movies",
        },
        buyTicket: "Buy tickets",
        footerTitles: {
          guests: "Guests",
          members: "Members",
          about: "About Moviestaden",
        },
        ftGuests: {
          reservations: "My reservations",
          customerService: "Customer service",
          QA: "Questions and answers",
          pricing: "Pricing",
          largerGroups: "Book larger groups",
        },
        ftMembers: {
          signIn: "Sign in",
          signUp: "Sign up",
          aboutMembership: "About the membership",
        },
        ftAbout: {
          Press: "Press",
          Job: "Job",
          socialMedia: "Social Media",
          leaveFeedback: "Leave feedback",
        },
        payTitle: "Pay by credit card",
        namePerson: "Name",
        email: "Email",
        cardPerson: "Card details",
        confirmOrder: "Pay",
        seatsSelected: "Selected seats: ",
        totalCost: "Total cost: ",
        showtimes: "Showtimes",
        ticketsBuy: "Buy tickets",
        proceedToPayment: "Proceed to payment",
        noShowtimes: "Showtimes are not available for this movie now!",
        from: "From ",
        searchMovie: "Search movies",
        h: "h",
        min: "min",
        selectSeats: "Seats",
        errorPayment: "Please fix errors to finish the payment",
        donePayment:
          "Thank you! Payment succeeded. We’ll send you a confirmation email with ticket details.",
        unpaidReservation: "This reservation is unpaid",
        thanksForOrder: "Thanks for your order! Your reservation ID is ",
        emailUs:
          "Email with order details will be send to you soon! If you have any questions, please email us ",
        paymentCancelled:
          "Your payment was canceled. Please try to book tickets again or buy them in Moviestaden cinema house",
        emailUsCancell: "If you have any questions, please email us",
      },
    },
    sv: {
      translations: {
        titleMovieRow: {
          nowInTheater: "För närvarande på bio",
          commingSoon: "Kommande filmer",
          retro: "Retrofilmer",
          family: "Barn och Familj",
          found: "Sökresultat",
          news: "Nyheter från Moviestaden",
          toplist: "Topplista",
        },
        buyTicket: "Boka biljetter",
        footerTitles: {
          guests: "Gäster",
          members: "Medlemmar",
          about: "Om Moviestaden",
        },
        ftGuests: {
          reservations: "Mina reservationer",
          customerService: "Kundservice",
          QA: "Frågor och svar",
          pricing: "Prissättning",
          largerGroups: "Boka större grupper",
        },
        ftMembers: {
          signIn: "Logga in",
          signUp: "Bli medlem",
          aboutMembership: "Om medlemskapet",
        },
        ftAbout: {
          Press: "Press",
          Job: "Jobb",
          socialMedia: "Sociala medier",
          leaveFeedback: "Lämna feedback",
        },
        payTitle: "Betala med kontokort",
        namePerson: "Namn",
        email: "E-post",
        cardPerson: "Fyll i dina kortdetaljer",
        confirmOrder: "Betala",
        seatsSelected: "Utvalda platser: ",
        totalCost: "Totalpris: ",
        showtimes: "Visningstider",
        ticketsBuy: "Köp biljetter",
        proceedToPayment: "Fortsätt till betalning",
        noShowtimes:
          "Visningstider är inte tillgängliga för den här filmen nu!",
        from: "Från ",
        searchMovie: "Sök filmer",
        h: "tim",
        min: "min",
        selectSeats: "Platser",
        errorPayment: "Åtgärda fel för att slutföra betalningen",
        donePayment:
          "Tack! Betalningen lyckades. Vi skickar ett bekräftelsemeddelande med biljettinformation.",
        unpaidReservation: "Denna reservation är obetald",
        thanksForOrder: "Tack för din beställning! Ditt boknings-ID är ",
        emailUs:
          "E-post med beställningsinformation skickas till dig snart! Skicka ett e-postmeddelande till oss om du har några frågor",
        paymentCancelled:
          "Din betalning har annullerats. Du kan boka om dina biljetter eller köpa dem på filmkontoret Moviestaden",
        emailUsCancell:
          "Du kan klargöra information genom att skicka frågor till",
      },
    },
    ru: {
      translations: {
        titleMovieRow: {
          nowInTheater: "Сейчас в кино",
          commingSoon: "Скоро в кино",
          retro: "Ретро показ",
          family: "Семейные фильмы",
          found: "Найденные фильмы",
          news: "Новости кинотеатра Moviestaden",
          toplist: "Популярные фильмы",
        },
        buyTicket: "Купить билеты",
        footerTitles: {
          guests: "Гости",
          members: "Аккаунт",
          about: "О Moviestaden",
        },
        ftGuests: {
          reservations: "Мои бронирования",
          customerService: "Обслуживание клиентов",
          QA: "Вопросы и ответы",
          pricing: "Ценообразование",
          largerGroups: "Бронируйте большие группы",
        },
        ftMembers: {
          signIn: "Войти",
          signUp: "Зарегистрироваться",
          aboutMembership: "О членстве",
        },
        ftAbout: {
          Press: "Пресса",
          Job: "Работа",
          socialMedia: "Социальные медиа",
          leaveFeedback: "Оставить отзыв",
        },
        payTitle: "Оплатить кредитной картой",
        namePerson: "Имя",
        email: "Электронная почта",
        cardPerson: "Данные карты",
        confirmOrder: "Платить",
        seatsSelected: "Выбранные места: ",
        totalCost: "Общая стоимость: ",
        showtimes: "Сеансы",
        ticketsBuy: "Билеты",
        proceedToPayment: "Перейти к оплате",
        noShowtimes: "Расписание сеансов для этого фильма сейчас недоступно!",
        from: "с ",
        searchMovie: "Поиск фильмов",
        h: "ч",
        min: "мин",
        selectSeats: "Места",
        errorPayment: "Пожалуйста, исправьте ошибки, чтобы завершить оплату",
        donePayment:
          "Спасибо! Оплата прошла успешно. Мы отправим вам подтверждение по электронной почте с деталями билета.",
        unpaidReservation: "Пожалуйста, дождитесь оплаты заказа!",
        thanksForOrder: "Спасибо за ваш заказ! Номер вашего заказа: ",
        emailUs:
          "Письмо с подтверждением заказа будет отправлено на ваш почновый ящик! Вы можете уточнить детали заказа или задать вопросы отправив нам письмо на ",
        paymentCancelled:
          "Ваш платеж был отменен. Вы можете повторить бронирование билетов или купить их в Moviestaden cinema кинотеатре",
        emailUsCancell: "Уточнить информацию можно отправив вопросы на почту",
      },
    },
    be: {
      translations: {
        titleMovieRow: {
          nowInTheater: "Зараз у кінатэатры",
          commingSoon: "Будучыя фільмы",
          retro: "Рэтра фільмы",
          family: "Дзеці і сям'я",
          found: "Знойдзеныя фільмы",
          news: "Навіны кінатэатра Moviestaden",
          toplist: "Спіс лепшых фільмаў",
        },
        buyTicket: "Купіць білеты",
        footerTitles: {
          guests: "Госці",
          members: "Пра Сяброўства",
          about: "Пра Moviestaden",
        },
        ftGuests: {
          reservations: "Мае заказы",
          customerService: "Спажывецкая служба",
          QA: "Пытанні і адказы",
          pricing: "Цэны",
          largerGroups: "Замоўце большыя групы",
        },
        ftMembers: {
          signIn: "Увайсці",
          signUp: "Зарэгістравацца",
          aboutMembership: "Пра сяброўства",
        },
        ftAbout: {
          Press: "Прэса",
          Job: "Праца",
          socialMedia: "Сацыяльныя сеткі",
          leaveFeedback: "Пакінуць водгук",
        },
        payTitle: "Аплата крэдытнай картай",
        namePerson: "Імя",
        email: "Электронная пошта",
        cardPerson: "Дадзеныя карты",
        confirmOrder: "Плаціць",
        seatsSelected: "Абраныя месцы: ",
        totalCost: "Агульны кошт: ",
        showtimes: "Паказы",
        ticketsBuy: "Бiлеты",
        proceedToPayment: "Перайсці да аплаты",
        noShowtimes: "Часы паказу гэтага фільма зараз недаступны!",
        from: "з ",
        searchMovie: "Пошук фільмаў",
        h: "г",
        min: "хв",
        selectSeats: "Месцы",
        errorPayment:
          "Kалі ласка, выпраўцеыпраўце памылкі, каб скончыць плацеж",
        donePayment:
          "Дзякуй! Аплата атрымалася. Мы вышлем вам ліст з пацверджаннем з падрабязнасцямі білетаў.",
        unpaidReservation: "Калі ласка, дачакайцеся аплаты заказа!",
        thanksForOrder: "Дзякуй за ваш заказ! Нумар вашага заказу: ",
        emailUs:
          "Пісьмо з пацверджаннем заказу будзе адпраўлена на ваш пачтовы яшчык! Вы можаце ўдакладніць дэталі заказу альбо задаць пытанні адправиў нам ліст на электронную пошту",
      },
    },
  },
});

export default i18n;
