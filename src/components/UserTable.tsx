import { useEffect, useState } from "react";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [dragIndex, setDragIndex] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const users = await response.json();
      setUsers(users);
    };
    getUsers();
  }, []);

  const dragStart = (index) => {
    setDragIndex(index);
  };

  const dragEnter = (index) => {
    if (index === dragIndex) return;
    setUsers((prevState) => {
      let newUsers = JSON.parse(JSON.stringify(prevState));
      const deleteElement = newUsers.splice(dragIndex, 1)[0];
      newUsers.splice(index, 0, deleteElement);
      return newUsers;
    });
    setDragIndex(index);
  };

  const dragEnd = () => {
    console.log("ここにサーバへの並び替え後のデータ送信処理を追加");
    setDragIndex(null);
  };

  return (
    <div style={{ margin: "2em" }}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>名前</th>
            <th>ユーザ名</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
              draggable={true}
              onDragStart={() => dragStart(index)}
              onDragEnter={() => dragEnter(index)}
              onDragOver={(e) => e.preventDefault()}
              onDragEnd={dragEnd}
              className={index === dragIndex ? "dragging" : ""}
            >
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
