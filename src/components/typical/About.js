import React, {Component} from 'react';
import poster from "../../assets/poster.jpg";

class About extends Component {
    render() {
        return (
            <div className="mt-5 container-fluid">
                <p>Железный банк считается самой могущественной финансовой организацией во всем Известном мире.
                    Его клиентами являются люди как на Эссосе, так и на Вестеросе, включая правительство Короля Андалов
                    и Первых людей.</p>
                <p>Железный банк Браавоса предоставляет деньги всем, начиная от торговцев,
                    и заканчивая королями и империями, а также другими банками.</p>
                <img src={poster} alt="Постер" className="img-fluid"/>
            </div>
        );
    }
}

export default About;
