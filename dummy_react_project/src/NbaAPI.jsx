import { useState, useEffect, handleSubmit } from 'react'

function NbaAPI() {
    const [stats, setStats] = useState([]);

    useEffect(() => {
        fetch('https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams')
        .then(res => res.json())
        .then(
            (data) => {
                setStats(data.sports[0].leagues[0].teams);
            });
    }, []);

    console.log(stats);
    return <>
        <div className="table-responsive">
            <table className="products-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Abbreviation</th>
                        <th>Location</th>
                        <th>Logo</th>
                    </tr>
                </thead>
                <tbody>
                    {stats.map((team, index) => (
                        <tr key={`${team.team.id}-${index}`}>
                            <td>{team.team.displayName}</td>
                            <td className="team-abbreviation">{team.team.abbreviation}</td>
                            <td>{team.team.location}</td>
                            <td>
                                <img
                                    src={team.team.logos[0].href}
                                    alt={team.team.displayName}
                                    className="team-logo"
                                    width="50"
                                    height="50"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
}

export default NbaAPI;