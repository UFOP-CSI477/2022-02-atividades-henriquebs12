import {
  Avatar,
  Box,
  HStack,
  Icon,
  IconButton,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useGetIdentity } from "@refinedev/core";
import { IconMoon, IconSun } from "@tabler/icons";

type IUser = {
  id: number;
  name: string;
  avatar: string;
};

export const Header: React.FC = () => {
  const { data: user } = useGetIdentity<IUser>();
  const showUserInfo = user && (user.name || user.avatar);

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      py="2"
      px="4"
      display="flex"
      justifyContent="flex-end"
      gap={2}
      w="full"
      bg="chakra-body-bg"
    >
      <IconButton
        variant="ghost"
        aria-label="Toggle theme"
        onClick={toggleColorMode}
      >
        <Icon
          as={colorMode === "light" ? IconMoon : IconSun}
          w="24px"
          h="24px"
        />
      </IconButton>
      {showUserInfo && (
        <HStack>
          <Text size="sm" fontWeight="bold">
            {user?.name}
          </Text>
          <Avatar size="sm" name={user?.name} src={user?.avatar} />
        </HStack>
      )}
    </Box>
  );
};
