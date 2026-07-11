import { useState, useEffect } from 'react'

import './App.css'
import Input from './components/input';
import Output from './components/output';
function App() {
  const [units, setUnits] = useState(() => {
    const saved = localStorage.getItem("eod-units");
  
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  function setUnitInfo(updatedUnit){
    return setUnits(units.map(unit => {
      if(unit.id === updatedUnit.id){
        return updatedUnit;
      }else{
        return unit;
      }
    }))
  }
  function deleteUnit(unit){
    return setUnits(units.filter(u => unit.id !== u.id))
  }

  useEffect(() => {
    localStorage.setItem(
      "eod-units",
      JSON.stringify(units)
    );
  }, [units]);
  

  return (
    <>
      <div className='header'>
      <button
        id='addUnit'
        className='addButton'
        onClick={() => setUnits([...units, {
            id: (() => crypto.randomUUID())(),
            serialNumber: "",
            testType: "",
            buildType: "",
            startTime: "",
            endTime: "",
            conditionalSignoff: false,
            carryoverAttempts: "",
            carryoverStatus: "",
            dryOutComplete: "",
            unitComplete: "",
            points: []
        }])}
        >
          Add New Unit
        </button>
        <h1>EOD Generator</h1>
        <div></div>
      </div>
      <div className='body'>
        <section className='input'>
          <Input setUnitInfo={setUnitInfo} units={units} setUnits={setUnits} deleteUnit={deleteUnit}/>
        </section>

        <section className='output'>
         <Output  units={units}/>
        </section>
      </div>
    </>
  )
}

export default App
