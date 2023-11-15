import {TextInput} from "react-native"
import './App.css';
import _, { parseInt } from "lodash"
import {useState} from "react"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import logo from './logo.svg';

const DEF_TXT = 
`         25\t2019-11-25	08:30:00 Normal	=> 00:00:00 - 10:05:58 = 10:05:58 
					=> 10:06:58 - 11:52:37 = 01:45:39 
					=> 12:02:12 - 13:05:54 = 01:03:42 
					=> 15:38:20 - 16:26:21 = 00:48:01 
					=> 16:36:15 - 18:39:36 = 02:03:21 
					=> 20:19:46 - 20:51:35 = 00:31:49 
					=> 21:33:47 - 23:11:51 = 01:38:04`;

function App() {
  let zer = "";
  let [result,setResult]= useState("");
  return (
    <><header style={{ 
      height: 50, width: 1840,backgroundColor:"blueviolet" 
    }}>Raicher</header>
     <Nav defaultActiveKey="/home" className="flex-sm-column" style={{
          backgroundColor:"blue", float:"left",width:50,height:1500}
          }>
          <Nav.Link href="/home"> </Nav.Link>

          <Nav.Link eventKey="link-1"> </Nav.Link>

          <Nav.Link eventKey="link-2"> </Nav.Link>

          <Nav.Link eventKey="disabled" disabled>
             
          </Nav.Link>
      </Nav>
    <Container style={{backgroundColor:"purple",borderWidth:2,float:"left",width:1100}}>   
    <div className="App">
      
        
      {/* <div class="widget">
        <ul class="widget-list">
          <li></li>
          <li>Фотошоп</li>
          <li>Типографика</li>
          <li>Музыка</li>
          <li>Видео</li>
        </ul>
      </div> */}
      
      <TextInput
        multiline={true}
        numberOfLines={10}
        style={{ height: 500,width:950,borderStyle: "solid", borderWidth:2,float:"left" }} 
      
        onChange={function(event){
            zer=event.target.value;
            console.log(zer)
      }
      }>
        {zer}
      </TextInput>
      
  
      <div id="totalTime" style={{float:"left"}}>TotalTime:{result.totalTime}</div>
      <div id="daysCount"style={{float:"left"}}>Count of days:{result.daysCount}</div>
      <div id="hours_norma"style={{float:"left"}}>Everyday Normal:{result.hours_norma}</div>
      <button onClick={function(){
        console.log(result);
        let strings = zer.split("\n");
        let times = [];
        let sum = 0;
        let days = 0;
        _.each(strings, s => {
          let t;
          if (s.split(" = ")[1]) {
            let tResult = s.split(" = ")[1];

            t = tResult.split(":");
            let t0 = parseInt(t[0]);
            if (t0 < 0) t0 = t0 + 24;

            t = parseInt(t[2]) + parseInt(t[1]) * 60 + t0 * 60 * 60;
            sum += t;
            times.push(t);
          }
          console.log(s.split(" ").toString(),'?')
          console.log(s.split(" ")[1],'?')
          if (s.split(/\t| /)[1]) {
            console.log('wowo')
            let date = new Date(Date.parse(s.split(/\t| /)[1]));
            let day = date.getDay();
            if (day !== 0 && day !== 6) {
              days=days+1;
            }
          }
        });
        let actualTime= new Date(sum*1000);
        let actHour = (actualTime.getUTCHours() + (actualTime.getUTCDate()-1) * 24).toString()
        let actMin = actualTime.getUTCMinutes().toString()
        let actSec = actualTime.getUTCSeconds().toString()
        console.log(days,"dny")
        console.log(actualTime)
        console.log(actHour,"часы")
        setResult({
          totalTime: (actHour + ":" + actMin + ":" + actSec),
           daysCount: days,
          hours_norma: days * 8.5
         });
      }}style={{float:"bottom"}}>Нажми меня!</button>
    </div>
    </Container>
    </>
  );
}

export default App;
