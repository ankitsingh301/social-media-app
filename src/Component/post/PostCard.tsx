import { Card, CardBody, Center, Image, Stack, Text } from "@chakra-ui/react";

interface IPROPS {
  post: any;
}

const PostCard: React.FC<IPROPS> = ({ post }) => {
  return (
    <Center>
      <Card maxW="sm">
        <CardBody>
          {post.image && <Image src={post.image} borderRadius="lg" />}

          <Stack spacing="3">
            <Text>{post.post}</Text>
          </Stack>
        </CardBody>
      </Card>
    </Center>
  );
};
export default PostCard;
