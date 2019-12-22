import React from 'react'
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import "../app.scss";
import cx from "classnames";
import Collapse from "@kunukn/react-collapse";


class AboutUs extends React.Component {
    state = {
      isOpen1: false,
      isOpen2: false,
      isOpen3: false,
      spy3: {}
    };
  
    render() {
      return (
        // 学术部  活动部  宣传部  外联部
        
        <div className="app">
        <h1 className="x-large">CUCS社团简介</h1>
        <p>Chinese Union in Computer Science (CUCS) 成立于2017年4月，社团创立的初衷是希望建立一个能让ICS学院的所有中国学生进行学术或非学术性沟通交流的平台。目前社团分为四个部门，分别是：</p>
          <button
            className={cx("app__toggle", {
              "app__toggle--active": this.state.isOpen1
            })}
            onClick={() => this.toggle(1)}
          >
            <span className="app__toggle-text">学术部</span>
            <div className="rotate90">
              <svg
                className={cx("icon", { "icon--expanded": this.state.isOpen1 })}
                viewBox="6 0 12 24"
              >
                <polygon points="8 0 6 1.8 14.4 12 6 22.2 8 24 18 12" />
              </svg>
            </div>
          </button>
          <Collapse
            isOpen={this.state.isOpen1}
            className={
              "app__collapse app__collapse--gradient " +
              (this.state.isOpen1 ? "app__collapse--active" : "")
            }
          >
            <div className="app__content">
              We are cool!
              <img
                className="image"
                alt="random"
                src="https://source.unsplash.com/user/erondu/500x200"
              />
              {/* <button onClick={() => this.toggle(1)} className="app__button">
                close
              </button> */}
            </div>
          </Collapse>
  
          {/* <p className="app__text">未来社团将会不定期举行学术分享会以及关于ICS学院Lower Level课程（如ICS 31, 32, 33）的Review Session，以此来帮助刚进入ICS学院，并不是很熟悉编程的同学们更好的学习掌握课程内容。社团近期还计划建立一个Project Platform帮助大家寻找志同道合的朋友一起做想做的事。除此之外，社团未来还会有各种非学术的休闲活动，让大家有机会认识更多有共同语言的朋友，丰富课外生活。</p> */}
        </div>
      );
    }
  
    toggle = index => {
      let collapse = "isOpen" + index;
  
      this.setState(prevState => ({ [collapse]: !prevState[collapse] }));
    };
  }
  
  export default AboutUs;
  