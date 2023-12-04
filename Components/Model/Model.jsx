import React, { useState } from 'react';
import Style from './MOdel.module.css';
import { useContext, useEffect } from 'react';
import Image from 'next/image';

import images from '../../assets';
import { MrChatAppContext } from "../../Context/MrChatAppContext";
import { Loader } from "../../Components/index"
const Model = ({ openBox, title, head, info, smallInfo, image, functionName, address }) => {
    
    const [name, setName] = useState("");
    const [accountAddress, setAccountAddress] = useState("");
    const { loading } = useContext(MrChatAppContext)

    useEffect(() => {
        setAccountAddress(address);
    }, []);

    return (
        <div className={Style.Model}>
            <div className={Style.Model_box}>
                <div className={Style.Model_box_left}>
                    <Image className={Style.image} src={image} alt='Buddy' width={700} height={700} />
                </div>
                <div className={Style.Model_box_right}>
                    <h1>{title}<span>{head}</span></h1>
                    <p>{info}</p>
                    <small>{smallInfo}</small>
                    {loading == true ? (
                        <Loader />
                    ) : (
                        <div className={Style.Model_box_right_name}>
                            <div className={Style.Model_box_right_name_info}>
                                <Image src={images.accountName} alt="user" width={35} height={30} />
                                <input type='text' placeholder='Enter your name' onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className={Style.Model_box_right_name_info}>
                                <Image src={images.location} alt="address" width={30} height={30} />
                                <input type='text' placeholder={address || "Enter address.."} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className={Style.Model_box_right_name_btn}>
                                <button onClick={() => functionName({ name, accountAddress })}>
                                    {""}
                                    <Image src={images.send} alt="send" width={30} height={30} />
                                    {""}
                                    Submit
                                </button>
                                <button onClick={() => openBox(false)}>
                                    {""}
                                    <Image src={images.close} alt="cancel" width={30} height={30} />
                                    {""}
                                    Cancel
                                </button>

                            </div>
                        </div>
                    )}

                </div>

            </div>
        </div>
    );
}


export default Model;