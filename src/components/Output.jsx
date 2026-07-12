export default function Output ({units}){
    return  <div className='unitOutput' contentEditable="true">
    {units.map(unitInfo =>
      <div key={unitInfo.id}>
        <b><u>
          {unitInfo.serialNumber} {unitInfo.buildType} {unitInfo.testType} (Started at {unitInfo.startTime}-{unitInfo.endTime ? `Completed at ${unitInfo.endTime}` : "WIP"})
        </u></b>
        <ul className='unitPoints'>
          {unitInfo.points.length === 0 ? <li>No issues found</li> : null}
          {unitInfo.points.map(point => {
            return <li>
              {point.description} 
              {point.department ? 
                <span>
                    <b> ({point.department}, {point.category})</b>
                     -{point.status}
                </span>
            : null }
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
    const {carryoverStatus, carryoverAttempts, dryOutComplete} = unitInfo;

    if(carryoverStatus == "Passed"){
        return <>
                <li>
                    Carryover {carryoverStatus} in {carryoverAttempts} attempt{carryoverAttempts > 1 ? "s" : ""}
                </li>
                <li>Unit dry-out {dryOutComplete ? "complete" : "in progress"}</li>
            </>
    }
    if(carryoverStatus == "In Progress"){
      return <li>
        Carrover {carryoverStatus}.
      </li>
    }
    return <li>
            Carryover {carryoverStatus} with {carryoverAttempts} attempt{carryoverAttempts > 1 ? "s" : ""}
        </li>
}
