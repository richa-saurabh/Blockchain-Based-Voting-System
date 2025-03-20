import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";

//INTERNAL IMPORT/
import { VotingContext } from "../../context/Voter";
import Style from "./NavBar.module.css";
import loding from "../../ffff.png";
// import loding from "../../image copy.png";

const NavBar = () => {
  const { connectWallet, error, currentAccount } = useContext(VotingContext);
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openNav && !event.target.closest(`.${Style.connect}`)) {
        setOpenNav(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openNav]);

  const toggleNav = () => {
    setOpenNav(!openNav);
  };

  return (
    <div className={Style.navbar}>
      {error === "" ? (
        ""
      ) : (
        <div className={Style.message__Box}>
          <div style={Style.message}>
            <p>{error}</p>
          </div>
        </div>
      )}

      <div className={Style.navbar_box}>
        <div className={Style.title}>
          <Link href={{ pathname: "/" }}>
            <Image src={loding} alt="logo" width={240} height={96} />
          </Link>
        </div>
        <div>
          <h1 className={Style.headerTitle}>
            <span className={Style.runningText}>Your Vote Matter!</span>
          </h1>
        </div>
        <div className={Style.connect}>
          {currentAccount ? (
            <div>
              <div onClick={toggleNav} className={Style.connect_flex}>
                <button>{currentAccount.slice(0, 10)}..</button>
                {currentAccount && (
                  <span>{openNav ? <AiFillUnlock /> : <AiFillLock />}</span>
                )}
              </div>

              {openNav && (
                <div className={Style.navigation}>
                  <p>
                    <Link href={{ pathname: "/" }}>Home</Link>
                  </p>

                  <p>
                    <Link href={{ pathname: "candidate-regisration" }}>
                      Candidate Registration
                    </Link>
                  </p>
                  <p>
                    <Link href={{ pathname: "allowed-voters" }}>
                      Voter Registration
                    </Link>
                  </p>

                  <p>
                    <Link href={{ pathname: "voterList" }}>Voter List</Link>
                  </p>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => connectWallet()}>Connect Wallet</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
