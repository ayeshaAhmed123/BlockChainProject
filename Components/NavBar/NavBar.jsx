import React from 'react';
import { useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import images from "../../assets/index"
import Link from 'next/link';
import { MrChatAppContext } from '../../Context/MrChatAppContext';
import Style from './NavBar.module.css'
import { Model, Error } from "../index"
const NavBar = () => {
    const menuItems = [
        {
            menu: "ALL USERS",
            link: "/"
        },
        {
            menu: "CHAT",
            link: "/"
        },
        {
            menu: "CONTACT",
            link: "/"
        },
        {
            menu: "SETTING",
            link: "/"
        },
        {
            menu: "FAQS",
            link: "/"
        },
        {
            menu: "TERMS OF USE",
            link: "/"
        }
    ]
    const [active, setActive] = useState(2);
    const [open, setOpen] = useState(false);
    const [openModel, setOpenModel] = useState(false);

    const { account, username, CheckWalletConnection,createAccount,error } = useContext(MrChatAppContext);
    return (
        <div className={Style.NavBar}>
            <div className={Style.NavBar_box}>
                <div className={Style.NavBar_box_left}>
                    <Image src={images.logo} alt="LOGO" width={50} height={50}></Image>
                </div>
                <div className={Style.NavBar_box_right}>

                    <div className={Style.NavBar_box_right_menu}>
                        {menuItems.map((el, i) => (
                            <div onClick={() => setActive(i + 1)} key={i + 1}
                                className={`${Style.NavBar_box_right_menu_items} ${active == i + 1 ? Style.active_btn : ""}`}>
                                <Link className={Style.NavBar_box_right_menu_items_link}
                                    href={el.link}>{el.menu}</Link>
                            </div>
                        ))}
                    </div>
                    {/* CONNECT WALLET */}
                    <div className={Style.NavBar_box_right_connect}>
                        {account == "" ? (
                            <button onClick={() => CheckWalletConnection()}>
                                {""}
                                <span>Connect Wallet</span>
                            </button>
                        ) : (
                            <button onClick={() => setOpenModel(true)}>
                                {""}
                                <Image src={username ? images.accountName : images.create2} alt="Account Image" width={20} height={20} />
                                <small>{username || "Create Account"}</small>
                            </button>
                        )}
                    </div>
                    <div className={Style.NavBar_box_right_open} onClick={() => setOpen(true)} >
                        <Image src={images.open} alt="open" width={30} height={30} />
                    </div>
                </div>
            </div>
            {openModel && (
                <div className={Style.modelBox}>
                    <Model openBox={setOpenModel} title="WELCOME TO" head="CHATERIA" 
                    info="Start chatting with friends, share your thoughts, and connect with
                    like-minded individuals. If you have any questions or need assistance,
                    feel free to reach out to our support team. Happy chatting!" 
                    smallInfo="Kindly select your name" image={images.hero} functionName={createAccount}
                    address={account} />
                </div>
            )}
            {error ==""? "":<Error error={error}/> }
        </div>
        );
}

export default NavBar;