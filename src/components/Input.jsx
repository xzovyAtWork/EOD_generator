import UnitForm from "./UnitForm"
function Input({units, setUnits, setUnitInfo, deleteUnit}){
    return  <div>
    {units.map( unit => 
      <UnitForm 
        key={unit.id} 
        unitInfo={unit} 
        units={units} 
        setUnitInfo={setUnitInfo} 
        deleteUnit={deleteUnit}
      />
    )}

  </div>
}

export default Input