import parse from "html-react-parser";
import { Fragment, createElement } from "react";

/**
 * This is a modified version of TinaMarkdown specified in tinacms/dist/rich-text/index.es.js.
 * This parser will render HTML and inline HTML elements properly by utilizing 
 * the HTML React Parser that takes in HTML and creates a valid JSX element from it. 
 * 
 * This function takes precedence over the lib/posts.js file as it forms the  
 * @param {[AST]} content An array of AST nodes from the rich text editor
 * @param {Number} depth The number of recursive calls to this OPMparser function
 * @returns Parsed unsanitized output from the rich text editor
 */
const OPMparser = ({ content, depth }) => {
  const nodes = Array.isArray(content) ? content : content.children;
  return createElement(Fragment, null, nodes.map((child, index) => {
    // console.log('creating', index, depth);
    return createElement(Node, {
      child,
      key: index,
      depth
    });
  }));
}

const Node = ({ child, depth }) => {
  const { children } = child;
  switch (child.type) {
    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6":
    case "p":
    case "blockquote":
    case "ol":
    case "ul":
    case "li":
      return createElement(child.type, null, createElement(OPMparser, {
        content: children,
        depth: depth + 1
      }));
    case "lic": // <li><>content</></li> ==> <li>content</li>
      return createElement(Fragment, null, createElement(OPMparser, {
        content: child.children,
        depth: depth + 1
      }));
    case "img": // Supported
      return /* @__PURE__ */ createElement("img", {
        src: child.url,
        alt: child.caption
      });
    case "a": // Supported
      return /* @__PURE__ */ createElement("a", {
        href: child.url
      }, /* @__PURE__ */ createElement(OPMparser, {
        content: children
      }));
    case "code_block": // Supported
      return /* @__PURE__ */ createElement("pre", null,
        /* @__PURE__ */ createElement("code", null, child.value)
      );
    case "hr": // Supported when --- is in the content
      return /* @__PURE__ */ createElement("hr", null);
    case "break":
      return /* @__PURE__ */ createElement("br", null);
    case "text":
      return /* @__PURE__ */ createElement(Leaf, {
        ...child
      });
    case "mdxJsxTextElement":
    case "mdxJsxFlowElement":
    case "maybe_mdx":
      return null;
    case "invalid_markdown":
      // console.log(child)
    case "html":
    case "html_inline":
      // console.log(child.value)
      return parse(child.value);
    default:
      if (typeof child.text === "string") {
        return /* @__PURE__ */ createElement(Leaf, {
          ...child
        });
      }
  }
};

const Leaf = (props) => {
  if (props.bold) {
    const { bold, ...rest } = props;
    return /* @__PURE__ */ createElement("strong", null, /* @__PURE__ */ createElement(Leaf, {
      ...rest
    }));
  }
  if (props.italic) {
    const { italic, ...rest } = props;
    return /* @__PURE__ */ createElement("em", null, /* @__PURE__ */ createElement(Leaf, {
      ...rest
    }));
  }
  if (props.underline) {
    const { underline, ...rest } = props;
    return /* @__PURE__ */ createElement("u", null, /* @__PURE__ */ createElement(Leaf, {
      ...rest
    }));
  }
  if (props.strikethrough) {
    const { strikethrough, ...rest } = props;
    return /* @__PURE__ */ createElement("s", null, /* @__PURE__ */ createElement(Leaf, {
      ...rest
    }));
  }
  if (props.code) {
    const { code, ...rest } = props;
    return /* @__PURE__ */ createElement("code", null, /* @__PURE__ */ createElement(Leaf, {
      ...rest
    }));
  }

  return /* @__PURE__ */ createElement(Fragment, null, props.text);
};

export default OPMparser;