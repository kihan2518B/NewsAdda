import { useContext, useEffect, useState } from "react"

import { useYourNewsState } from "../../context/YourNews/context"
import { ThemeContext } from "../../context/theme"
import { sport, team } from "../../context/YourNews/types"
import { API_ENDPOINT } from "../../config/constants"
import { usePreferencesState } from "../../context/Preferences/context"
import { UpdatePreferences } from "../../context/Preferences/action"


const PrefrencesForm = () => {
  const YourNewsState: any = useYourNewsState()
  const PreferencesState: any = usePreferencesState()
  console.log(PreferencesState)

  const { theme } = useContext(ThemeContext)
  const { isLoading, isError, teams, sports, errorMessage } = YourNewsState;

  const token = localStorage.getItem("authToken")

  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);

  //Changing State on checkbox change
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const value = event.target.value;

    if (name === 'sport') {
      if (checked) {
        setSelectedSports([...selectedSports, value]);
      } else {
        setSelectedSports(selectedSports.filter((sport) => sport !== value));
      }
    } else if (name === 'team') {
      if (checked) {
        setSelectedTeams([...selectedTeams, value]);
      } else {
        setSelectedTeams(selectedTeams.filter((team) => team !== value));
      }
    }
  };

  useEffect(() => {

    if (PreferencesState.preferences.selectedTeams.length != 0 || PreferencesState.preferences.selectedSports.length != 0) {   //If userPrefrences is there (i.e. user is loggedin)
      console.log("selectedSports", selectedSports)
      console.log("selectedTeams", selectedTeams)

      setSelectedSports(PreferencesState.preferences.selectedSports)
      setSelectedTeams(PreferencesState.preferences.selectedTeams)
    }
  }, [PreferencesState])
  console.log("selectedSports", selectedSports)
  console.log("selectedTeams", selectedTeams)

  const handleSubmit = async () => {
    UpdatePreferences(selectedSports, selectedTeams)
  };

  return (
    <div className={`w-full h-full `}>
      <form >
        <h3 className="text-violet-50 font-medium">Choose Your Favourite Sports</h3>
        {/* Sports List */}
        {isLoading && <>Loading...</>}
        {isError && <>{errorMessage}</>}
        <div className={`flex flex-wrap gap-3 h-20 ${theme == 'dark' ? 'text-violet-50' : 'text-black'} overflow-y-scroll scrollbar`}>
          {sports.map((Sport: sport) => (
            <div key={Sport.id} className={`flex gap-1 justify-center items-center `}>
              <label htmlFor={Sport.name}>{Sport.name}:</label>
              <input
                type="checkbox"
                name="sport"
                checked={selectedSports.includes(Sport.name)}
                onChange={handleCheckboxChange}
                id={Sport.name}
                value={Sport.name} />
            </div>
          ))}
        </div>

        <h3 className="text-violet-50 font-medium">Choose Your Favourite Teams</h3>
        {isLoading && <>Loading...</>}
        <div className={`flex flex-wrap gap-3 h-20 ${theme == 'dark' ? 'text-violet-50' : 'text-black'} overflow-y-scroll scrollbar`}>
          {teams.map((Team: team) => (
            <div key={Team.id} className={`flex gap-1 justify-center items-center `}>
              <label htmlFor={Team.name}>{Team.name}:</label>
              <input
                type="checkbox"
                name="team"
                checked={selectedTeams.includes(Team.name)}
                onChange={handleCheckboxChange}
                id={Team.name}
                value={Team.name}
              />
            </div>
          ))}
        </div>
        <button type="submit" onClick={handleSubmit} className={`shadow-sm ${theme == 'dark' ? 'bg-violet-500 text-violet-50 hover:bg-violet-600' : 'bg-gray-200 hover:text-violet-50 text-violet-900 hover:bg-violet-500'} font-medium shadow-violet-600 rounded h-7 w-20`}>Submit</button>
      </form>
    </div>
  )
}

export default PrefrencesForm
