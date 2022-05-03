import "../css/table.css"

const Table = ({data = {}}) => {
    const keys = Object.keys(data);
    console.log(keys);
    console.log(data);
    if (keys.length === 0) {
        return null;
    }
    return (
        <table>
            <caption>
                유저 정보
            </caption>
            {/* {keys.map(el => <tr key={el}><th>{el}</th><td>{JSON.stringify(data[el])}</td></tr>)} */}
            <tbody>
                <tr>
                    <th>
                        유저 ID
                    </th>
                    <td colSpan={4}>
                        {data.uid}
                    </td>
                </tr>
                <tr>
                    <th>
                        레벨
                    </th>
                    <td>
                        <input defaultValue={data.level.level}/>
                    </td>
                    <th>
                        경험치
                    </th>
                    <td>
                        <input  defaultValue={data.level.exp}/>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <button>저장</button>
            </tfoot>
        </table>
    );
};
export default Table;