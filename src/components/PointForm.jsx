function PointForm({
    point,
    unitInfo,
    setUnitInfo,
    deletePoint,
  }) {
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
        <button
          className="removeButton"
          id='removePoint'
          onClick={() => deletePoint(point.id)}
        >
          Remove Point
        </button>
  
          <label>
            Description:
            <input
              type="text"
              value={point.description}
              onChange={e =>
                updatePoint({
                  description: e.target.value,
                })
              }
            />
          </label>
          <label>
            Department:
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
                "Assembly",
                "Electrical",
                "Panel Shop",
                "Plumbing",
                "Third Party",
              ].map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label>
            Category:
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
          </label>
          <label>
            Status: 
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
          </label>
      </div>
    )
  }

  export default PointForm