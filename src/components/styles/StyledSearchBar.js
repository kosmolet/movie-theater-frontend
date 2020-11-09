import styled from "styled-components";

export const StyledSearchBar = styled.div`
  width: 100%;
  height: 105px;
  background: #262b2f;
  padding: 25px 20px 0px 20px;
  box-sizing: border-box;
  color: #fff;
`;

export const StyledSearchBarContent = styled.div`
  max-width: 1280px;
  width: 100%;
  height: 70%;
  background: #353535;
  margin: 0 auto;
  border-radius: 10px;
  position: relative;
  color: #fff;

  .fa-search {
    position: absolute;
    left: 50px;
    top: 12px;
    color: #fff;
    z-index: 1000;
  }

  input {
    font-family: "Abel", sans-serif;
    font-size: 1.5rem;
    position: absolute;
    left: 0px;
    margin: 8px 0;
    padding: 0 0 0 60px;
    border: 0;
    width: 95%;
    background: transparent;
    height: 40px;
    color: #fff;
    box-sizing: border-box;

    :focus {
      outline: none;
    }

    @media screen and (max-width: 720px) {
      font-size: 28px;
    }
  }
`;
