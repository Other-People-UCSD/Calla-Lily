import Layout from "@/components/layout";

export default function Custom404() {
  return (
    <>
      <Layout post title={"404 Page Not Found"}>
        <h1>404 - Page Not Found</h1>
        <p><strong>Posts that are not part of a collection are now found by the year they 
          were published e.g &quot;/missed-connections&quot; is now &quot;/2023/missed-connections&quot;</strong>.
          This new permalink is very unlikely to be changed back in a future update.</p>
        <p>If you are experiencing any issues in the new website,
          please email us about the problem so that we can fix it! </p>
      </Layout>
    </>
  );
}
