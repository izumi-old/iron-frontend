import React, {Component} from 'react';
import {Container} from "react-bootstrap";
import facebook_icon from "../../assets/facebook.png";
import twitter_icon from "../../assets/twitter.png";
import instagram_icon from "../../assets/instagram.jpg";
import telegram_icon from "../../assets/telegram.png";
import vk_icon from "../../assets/vk.png";

class Media extends Component {
    render() {
        return (
            <Container className="d-flex justify-content-center">
                <a className="p-2" href="#media">
                    <img src={facebook_icon} alt="facebook" height="32px" width="32px"/></a>
                <a className="p-2" href="#media">
                    <img src={telegram_icon} alt="telegram" height="32px" width="32px"/></a>
                <a className="p-2" href="#media">
                    <img src={instagram_icon} alt="instagram" height="32px" width="32px"/></a>
                <a className="p-2" href="#media">
                    <img src={twitter_icon} alt="twitter" height="32px" width="32px"/></a>
                <a className="p-2" href="#media">
                    <img src={vk_icon} alt="ВКонтакте" height="32px" width="32px"/></a>
            </Container>
        );
    }
}

export default Media;
