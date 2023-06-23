import { deleteTodo, toggleTodoStatus, updateTodo } from "../api/todo";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import {
  Badge,
  Box,
  Heading,
  Text,
  useToast,
  Stack,
  Textarea,
  Select,
  Button,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";

const TodoBox = ({ todo }) => {
  const toast = useToast();
  const { isLoggedIn } = useAuth();

  const [title, setTitle] = React.useState(todo.title);
  const [description, setDescription] = React.useState(todo.description);
  const [status, setStatus] = React.useState(todo.status);
  const [isLoading, setIsLoading] = React.useState(false);

  const [editable, setEditable] = useState(false);
  const handleTodoDelete = async (id) => {
    if (confirm("Are you sure you wanna delete this todo?")) {
      deleteTodo(id);
      toast({ title: "Todo deleted successfully", status: "success" });
    }
  };
  const handleToggle = async (id, status) => {
    const newStatus = status == "completed" ? "pending" : "completed";
    await toggleTodoStatus({ docId: id, status: newStatus });
    toast({
      title: `Todo marked ${newStatus}`,
      status: newStatus == "completed" ? "success" : "warning",
    });
  };
  const handleTodoUpdate = async (docId) => {
    if (!isLoggedIn) {
      toast({
        title: "You must be logged in to update a todo",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    setIsLoading(true);
    const todo = {
      docId,
      title,
      description,
      status,
    };
    await updateTodo(todo);
    setIsLoading(false);
    setEditable(false);
    toast({ title: "Todo updated successfully", status: "success" });
  };
  return (
    <Box
      p={3}
      boxShadow="2xl"
      shadow={"dark-lg"}
      transition="0.2s"
      _hover={{ boxShadow: "sm" }}
      onClick={() => setEditable(true)}
    >
      {editable ? (
        <>
          <Stack direction="column">
            <Input
              placeholder={todo.title}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              placeholder={todo.description}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option
                value={"pending"}
                style={{ color: "yellow", fontWeight: "bold" }}
              >
                Pending ⌛
              </option>
              <option
                value={"completed"}
                style={{ color: "green", fontWeight: "bold" }}
              >
                Completed ✅
              </option>
            </Select>
            <Button
              onClick={() => handleTodoUpdate(todo.id)}
              disabled={title.length < 1 || description.length < 1 || isLoading}
              variantColor="teal"
              variant="solid"
            >
              Edit
            </Button>
          </Stack>
        </>
      ) : (
        <>
          <Heading as="h3" fontSize={"xl"}>
            {todo.title}
            <Badge
              color="red.500"
              bg="inherit"
              transition={"0.2s"}
              _hover={{
                bg: "inherit",
                transform: "scale(1.2)",
              }}
              float="right"
              size="xs"
              onClick={() => handleTodoDelete(todo.id)}
            >
              <FaTrash />
            </Badge>
            <Badge
              color={todo.status == "pending" ? "gray.500" : "green.500"}
              bg="inherit"
              transition={"0.2s"}
              _hover={{
                bg: "inherit",
                transform: "scale(1.2)",
              }}
              float="right"
              size="xs"
              onClick={() => handleToggle(todo.id, todo.status)}
            >
              {todo.status == "pending" ? <FaToggleOff /> : <FaToggleOn />}
            </Badge>
            <Badge
              float="right"
              opacity="0.8"
              bg={todo.status == "pending" ? "yellow.500" : "green.500"}
            >
              {todo.status}
            </Badge>
          </Heading>
          <Text>{todo.description}</Text>
        </>
      )}
    </Box>
  );
};
export default TodoBox;
