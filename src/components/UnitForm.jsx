import PointForm from "./PointForm"
import { useState } from "react"
function UnitForm({unitInfo, setUnitInfo, deleteUnit}){
  const [collapse, setCollapse] = useState(false);
  
  function deletePoint(pointId) {
    setUnitInfo({
      ...unitInfo,
      points: unitInfo.points.filter(
        point => point.id !== pointId
      ),
    })
  }
 
  return (
    <div className="unit">
      <div className="unitForm">
        <div>
          <button
          id='removeUnit'
          className='removeButton'
            onClick={ () => {
              const confirmation = confirm(`Delete unit ${unitInfo.serialNumber}?`);
              if(confirmation){
                return deleteUnit(unitInfo)
              }else return;
            }}
          >
            Remove Unit
          </button>
          <button onClick={()=>setCollapse(!collapse)}>{collapse ? "Show" : "Hide"}</button>
        </div>
        { !collapse ?
        <>
          <div>
            <label htmlFor="unitInfo">
              Unit Info:
              <input
                type="text"
                placeholder='1234-12L'
                value={unitInfo.serialNumber}
                onChange={e => setUnitInfo({...unitInfo, serialNumber: e.target.value})}/>
            </label>
              <label>
                Build Type:
                <select 
                  value={unitInfo.buildType}  
                  onChange={ e =>  
                      setUnitInfo({...unitInfo, buildType: e.target.value})}
                  >
                  <option value="" disabled>--Select Build --</option>
                  {["Ballard", "DAHU", "MacGyver", "TAHU"].map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <div>
                  <label htmlFor="testType">
                    Test Type:
                      <select
                          value={unitInfo.testType}
                          onChange={e =>
                          setUnitInfo({
                              ...unitInfo,
                              testType: e.target.value,
                              dryOutComplete:
                              e.target.value === "Full Water"
                                  ? unitInfo.dryOutComplete
                                  : false,
                          })
                      }>
                      <option value="" disabled>--Select Test Type --</option>
                      <option value="Bypass">Bypass</option>
                      <option value="Full Water">Full Water</option>
                    </select>
                  </label>
                  {unitInfo.testType === "Full Water" && (
                      <div>
                      <label htmlFor="dryOutComplete">
                          Dry-out Complete:
                      </label>
                      <input
                          type="checkbox"
                          id="dryOutComplete"
                          checked={unitInfo.dryOutComplete}
                          onChange={e =>
                              setUnitInfo({
                                  ...unitInfo,
                                  dryOutComplete: e.target.checked,
                              })
                          }
                      />
                      </div>
                  ) && (
                      <div className="carryoverInfo">

                          <label htmlFor="carryoverStatus">
                              Carryover Status:                        
                              <select 
                                  value={unitInfo.carryoverStatus}
                                  onChange={ e =>
                                      setUnitInfo({
                                          ...unitInfo,
                                          carryoverStatus: e.target.value,
                                      })
                                  }
                              >
                                  <option value="" disabled>--Select --</option>
                                  {["Passed", "Failed", "In Progress"].map(option => (
                                      <option key={option} value={option}>
                                      {option}
                                      </option>
                                  ))}
                              </select>
                          </label>
                          <label htmlFor="carryoverAttempts">
                              Attempts:
                          <input
                              type="number"
                              name="carryoverAttempts"
                              id="carryoverAttempt"
                              value={unitInfo.carryoverAttempts}
                              onChange={ e =>
                                  setUnitInfo({
                                      ...unitInfo,
                                      carryoverAttempts: e.target.value,
                                  })
                              }/>
                          
                          </label>
                          {unitInfo.carryoverStatus == "Passed" ? <label>
                              Dryout Complete:
                              <input 
                                  type="checkbox" 
                                  name="dryoutComplete" 
                                  id="dryoutComplete" 
                                  value={unitInfo.dryOutComplete}
                                  onChange={ e => 
                                      setUnitInfo({
                                          ...unitInfo,
                                          dryOutComplete: e.target.checked
                                      })
                                  }
                              />
                          </label> : null }
                      </div>
                  )}
              </div>
          </div>
          <div>
            <label htmlFor="startTime">
              Start time:
              <input type="time" name="startTime" id="startTime" value={unitInfo.startTime} onChange={e =>  setUnitInfo({...unitInfo, startTime: e.target.value})}/>
            </label>
            <label htmlFor="endTime">
              End time:
              <input type="time" name="endTime" id="endTime" value={unitInfo.endTime} onChange={e =>  setUnitInfo({...unitInfo, endTime: e.target.value})} />
            </label>
          </div>
          <div>
            <span>
              <label htmlFor="unitComplete">
                Unit Complete:
              </label>
                <input
                type="checkbox"
                name="unitComplete"
                id="unitComplete"
                checked={unitInfo.unitComplete}
                onChange={e =>  setUnitInfo({...unitInfo, unitComplete: e.target.checked})}
                />
            </span>
            <span>
              <label htmlFor="conditionalSignoff">
                Conditional Sign-off:
              </label>
                <input
                type="checkbox"
                name='conditionalSignoff'
                id='conditionalSignoff'
                checked={unitInfo.conditionalSignoff}
                onChange={e => setUnitInfo({...unitInfo, conditionalSignoff: e.target.checked})}
                />
            </span>
          </div>
        </>
        : null }
      </div>
      { !collapse ?
      <>
        <div>
                                    
        {unitInfo.points.map(point => (
          <PointForm
            key={point.id}
            point={point}
            unitInfo={unitInfo}
            setUnitInfo={setUnitInfo}
            deletePoint={deletePoint}
          />
        ))}
        </div>
        <button
          id='addPoint'
          className='addButton'
          onClick={() =>
            setUnitInfo({
              ...unitInfo,
              points: [
                ...unitInfo.points,
                {
                  id: crypto.randomUUID(),
                  description: "",
                  department: "",
                  category: "",
                  status: "Fixed",
                },
              ],
            })
          }>
          Add New Point
        </button>
      </>
      : null }
    </div>
  )
}

export default UnitForm