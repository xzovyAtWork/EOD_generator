import { useState } from "react"
function PointForm({
    point,
    unitInfo,
    setUnitInfo,
    deletePoint,
  }) {
    const [collapse, setCollapse] = useState(false);
    function updatePoint(updates) {
      setUnitInfo({
        ...unitInfo,
        points: unitInfo.points.map(p =>
          p.id === point.id
            ? { ...p, ...updates }
            : p
        ),
      })
    }
  
    return (
      <div className='point'>
        
        <div>
          <button
            className="removeButton"
            id='removePoint'
            onClick={() => deletePoint(point.id)}
          >
            Remove Point
          </button>
          <button onClick={()=>setCollapse(!collapse)}>{collapse ? "Show" : "Hide"}</button>
        </div>
        { !collapse ?
        <>
          <label>
            Description:
          </label>
            <input
              type="text"
              value={point.description}
              onChange={e =>
                updatePoint({
                  description: e.target.value,
                })
              }
            />
          <label>
            Department:
          </label>
            <select
              value={point.department}
              onChange={e =>
                updatePoint({
                  department: e.target.value,
                })
              }
            >
              <option value="" disabled>--Select Dept. --</option>
            {[
                "A",
                "E",
                "PS",
                "P",
                "TP",
              ].map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          <label>
            Category:
          </label>
          <select
              value={point.category}
              onChange={e =>
                updatePoint({
                  category: e.target.value,
                })
              }
            >
            <option value="" disabled>--Select--</option>
            {[
                "Incorrect Termination",
                "Incorrect Installation",
                "Poor Workmanship",
                "Faulty Component",
                "Missing Component",
                "Out of Stock",
                "Adjustment",
            ].map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <label>
            Status: 
          </label>
            <select
              value={point.status}
              onChange={e =>
                updatePoint({
                  status: e.target.value,
                })
              }
            >
              <option value="" disabled>--Select--</option>
              <option value="Fixed">Fixed</option>
              <option value="Not Fixed">Not Fixed</option>
              <option value="IWO Requested">
                IWO Requested
              </option>
            </select>
        </>
          : null }
      </div>
    )
  }

  export default PointForm