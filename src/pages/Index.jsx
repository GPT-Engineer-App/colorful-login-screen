import React, { useState } from "react";
import { Box, Button, Container, Flex, FormControl, FormLabel, Heading, Input, Stack, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Index = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and SignUp
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = isLogin ? "https://backengine-ymx0.fly.dev/login" : "https://backengine-ymx0.fly.dev/signup";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: isLogin ? "Login Successful" : "Registration Successful",
          description: isLogin ? `Welcome back, ${email}` : `Account created for ${email}. Please login.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: data.error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: "Can't connect to the server. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="lg" py={12}>
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>{isLogin ? "Login" : "Sign Up"}</Heading>
        </Stack>
        <Box rounded={"lg"} boxShadow={"lg"} p={8} bg={useColorModeValue("white", "gray.700")}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                leftIcon={isLogin ? <FaSignInAlt /> : <FaUserPlus />}
                onClick={handleSubmit}
              >
                {isLogin ? "Sign in" : "Sign up"}
              </Button>
              <Flex justify={"center"}>
                <Button variant={"link"} color={"blue.400"} onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
                </Button>
              </Flex>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default Index;
