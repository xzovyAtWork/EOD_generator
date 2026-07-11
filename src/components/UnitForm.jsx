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
          <h2 style={{alignSelf: "center"}}>{unitInfo.serialNumber}</h2>
          <button onClick={()=>setCollapse(!collapse)}>{collapse ? "Show" : "Hide"}</button>
        </div>
        { !collapse ?
        <>
          <div>
            <div>
              <label htmlFor="unitInfo">
                Unit Info:
              </label>
              <input
                type="text"
                placeholder='1234-12L'
                value={unitInfo.serialNumber}
                onChange={e => setUnitInfo({...unitInfo, serialNumber: e.target.value})}/>
            </div>
              <div>
                <label>
                  Build Type:
                </label>
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
              </div>
              <div>
                  <label htmlFor="testType">
                    Test Type:
                  </label>
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
                            })}
                        />
                      </div>
                  ) && (
                      <div className="carryoverInfo">

                          <label htmlFor="carryoverStatus">
                              Carryover Status:                        
                          </label>
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
                          <label htmlFor="carryoverAttempts">
                              Attempts:
                          </label>
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
                              <label>Dryout Complete:</label>
                          {unitInfo.carryoverStatus == "Passed" ? <>
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
                          </> : null }
                      </div>
                  )}
              </div>
          </div>
          <div>
            <div>
              <label htmlFor="startTime">
                Start time:
              </label>
              <input
                type="time"
                name="startTime"
                id="startTime"
                value={unitInfo.startTime}
                onChange={e =>  setUnitInfo({...unitInfo, startTime: e.target.value})}
                />
            </div>
            <div>
              <label htmlFor="endTime">
                End time:
              </label>
              <input
              type="time"
              name="endTime"
              id="endTime"
              value={unitInfo.endTime}
              onChange={e =>  setUnitInfo({...unitInfo, endTime: e.target.value})}
              />
            </div>
          </div>
          <div>
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