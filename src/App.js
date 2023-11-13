import {TextInput} from "react-native"
import './App.css';
import _, { parseInt } from "lodash"
import {useState} from "react"

const DEF_TXT = 
`         25\t2019-11-25	08:30:00 Normal	=> 00:00:00 - 10:05:58 = 10:05:58 
					=> 10:06:58 - 11:52:37 = 01:45:39 
					=> 12:02:12 - 13:05:54 = 01:03:42 
					=> 15:38:20 - 16:26:21 = 00:48:01 
					=> 16:36:15 - 18:39:36 = 02:03:21 
					=> 20:19:46 - 20:51:35 = 00:31:49 
					=> 21:33:47 - 23:11:51 = 01:38:04`;

function App() {
  let zer = DEF_TXT;
  let [result,setResult]= useState("");
  return (
    <div className="App">
      <TextInput
        multiline={true}
        numberOfLines={10}
        style={{ height: 500,width:950,borderStyle: "solid", borderWidth:2 }} 
        onChange={function(event){
            zer=event.target.value;
            console.log(zer)
      }
      }>
        {zer}
      </TextInput>
      <button onClick={function(){
        console.log(result);
        let strings = zer.split("\n");
        let times = [];
        let sum = 0;
        let days = [];
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
          if (s.split("\t")[1]) {
            console.log('wowo')
            let date = new Date(Date.parse(s.split("	")[1]));
            let day = date.getDay();
            if (day != 0 && day != 6) {
              days.push(date);
            }
          }
        });
        let actualTime= new Date(sum*1000).toISOString();

        setResult({
          totalTime: actualTime.substring(actualTime.length - 13, actualTime.length - 5),
           daysCount: days.length,
           hours_norma: days.length * 8.5
         });
        
      }}>Нажми меня!</button>
      <div id="totalTime">{result.totalTime}</div>
      <div id="daysCount">{result.daysCount}</div>
      <div id="hours_norma">{result.hours_norma}</div>
    </div>
    
  );
}

export default App;
