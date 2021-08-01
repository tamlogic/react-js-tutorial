import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import './index.css';

// stateless functional component
// always return JSX

// JSX Rules
// return single element
// div/div or section/article or React.Fragment/div
// use cameCase for html attribute
// className instead of class
// close every element
// formatting

// const Greeting = () => {
//   return React.createElement('div', {}, React.createElement('h1', {}, 'Hello world'));
// }

// function Greeting() {
//   return (
//     <div onClick>
//       <h3>hello people</h3>
//       <ul>
//         <li>
//           <a href='#'>hello world</a>
//         </li>
//         <img src="" alt="" />
//         <input type="text" name="" id="" />
//       </ul>
//     </div>
//   );
// }

// Nested Components, React tools
// function Greeting() {
//   return (
//     <div>
//       <Person/>
//       <Message/>
//     </div>
//   );
// }

// const Person = () => <h2>john doe</h2>
// const Message = () => {
//   return <p>this is my message</p>;
// }

// ReactDom.render(<Greeting />, document.getElementById('root'));

// css
// import './index.css';

// function Booklist() {
//   // const item = {
//   //   abc: 'abc',
//   //   def: 3
//   // };
//   return (
//     <section className="booklist">
//       <Book url='https://tackexinh.com/wp-content/uploads/2021/01/hinh-anh-dep-chat-luong-001.jpg' title="Hello world in C" year={2020} author="Tam Tran"/>
//       <Book url="https://tackexinh.com/wp-content/uploads/2021/01/hinh-anh-dep-chat-luong-001.jpg" title="Gagile vòng quanh thế giới" year={2021} author="Tam Tran"/>
//       {/* <Book author={item}/> */}
//       <Book url="https://tackexinh.com/wp-content/uploads/2021/01/hinh-anh-dep-chat-luong-001.jpg" title="Sinh nhật" year={1998} author="Tam Tran"/>
//     </section>
//   );
// }

// const Book = (props) => {
//   console.log(props);
//   return (
//     <article>
//       <Image url={props.url}/>
//       <Year year={props.year}/>
//       <Author authorName={props.author}/>
//       <Title titleName={props.title}/>
//     </article>
//   );
// }

// const Image = (prop) => <img src={prop.url} alt="ImageName"/>;

// const Author = (prop) => <h1>{prop.authorName}</h1>;

// const Title = (prop) => <p>{prop.titleName}</p>;

// const Year = (prop) => <p>{prop.year}</p>;

ReactDom.render(<App/>, document.getElementById('root'));
