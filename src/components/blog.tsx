import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

function Blog() {
  const posts = Array.from({ length: 6 }).map((_, i) => ({
    title: `Blog post ${i + 1}`,
    image: "/placeholder.svg",
  }));

  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-2xl font-bold text-center mb-8">Blog</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="font-semibold">{post.title}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blog;
