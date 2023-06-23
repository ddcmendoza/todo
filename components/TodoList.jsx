import { Box, SimpleGrid } from "@chakra-ui/react";
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import TodoBox from "./TodoBox";
const TodoList = () => {
  const [todos, setTodos] = React.useState([]);
  const { user } = useAuth();
  const refreshData = () => {
    if (!user) {
      setTodos([]);
      return;
    }
    const q = query(collection(db, "todo"), where("user", "==", user.uid));
    onSnapshot(q, (querySnapchot) => {
      let ar = [];
      querySnapchot.docs.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
      });
      setTodos(ar);
    });
  };
  useEffect(() => {
    refreshData();
  }, [user]);

  return (
    <Box mt={5}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        {todos && todos.map((todo) => <TodoBox todo={todo} key={todo.id} />)}
      </SimpleGrid>
    </Box>
  );
};
export default TodoList;
