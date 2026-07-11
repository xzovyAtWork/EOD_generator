export default function Output ({units}){
    return  <div className='unitOutput' contentEditable="true">
    {units.map(unitInfo =>
      <div key={unitInfo.id}>
        <b><u>{unitInfo.serialNumber} {unitInfo.buildType} {unitInfo.testType} (
          {unitInfo.startTime}-{unitInfo.endTime ? unitInfo.endTime : "WIP"}
          )</u></b>
        <ul className='unitPoints'>
          {unitInfo.points.map(point => {
            return <li>
              {point.description} 
              <b> ({point.department.slice(0,1)}, {point.category})</b> -{point.status}
            </li>}
          )}
          {unitInfo.testType === "Full Water" ? <CarryoverInfo unitInfo={unitInfo} /> : null}
          <b>
            {unitInfo.unitComplete ?
              <>
                <li>Functionality Complete</li>
                <li>Unit Signed off {unitInfo.conditionalSignoff ? "conditionally" : ""}</li>
              </>
              :
              <li>Hand over to next shift</li>
            }
          </b>
        </ul>
      </div>
      )}
    </div>
}

function CarryoverInfo({unitInfo}){
    const {carryoverStatus, carryoverAttempts, dryOutComplete, testType} = unitInfo;

    if(carryoverStatus == "Passed"){
        return <>
                <li>
                    Carryover {carryoverStatus} with {carryoverAttempts} attempt{carryoverAttempts > 1 ? "s" : ""}
                </li>
                <li>Unit dry-out {dryOutComplete ? "complete" : "in progress"}</li>
            </>
    }
    return <li>
            Carryover {carryoverStatus} with {carryoverAttempts} attempt{carryoverAttempts > 1 ? "s" : ""}
        </li>
}
