import parse from "html-react-parser";
import { Fragment, createElement } from "react";

/**
 * This is a modified version of TinaMarkdown specified in tinacms/dist/rich-text/index.es.js.
 * This parser will render HTML and inline HTML elements properly by utilizing 
 * the HTML React Parser that takes in HTML and creates a valid JSX element from it. 
 * @param {[AST]} content An array of AST nodes from the rich text editor
 * @param {Number} depth The number of recursive calls to this OPMHTML function
 * @returns Parsed unsanitized output from the rich text editor
 */
const OPMHTML = ({ content, depth }) => {
  // console.log('OPMHTML');
  const nodes = Array.isArray(content) ? content : content.children;
  return createElement(Fragment, null, nodes.map((child, index) => {
    // console.log('creating', index, depth);
    return createElement(Node, {
      child,
      index,
      depth
    });
  }));
}

const Node = ({ child, index, depth }) => {
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
      // console.log('node is', child.type)
      return createElement(child.type, null, createElement(OPMHTML, {
        content: children,
        depth: depth + 1
      }));
    case "lic":
      // console.log('lic', child, child.children)
      return createElement("div", null, createElement(OPMHTML, {
        content: child.children,
        depth: depth + 1
      }));
    case "img":
      return /* @__PURE__ */ createElement("img", {
        src: child.url,
        alt: child.caption
      });
    case "a":
    case "code_block":
      return /* @__PURE__ */ createElement("pre", null,
        /* @__PURE__ */ createElement("code", null, value)
      );
    case "hr":
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
      console.log("invald markdown?")
    case "html":
    case "html_inline":
      // console.log('html node')
      // If the very first part of the content is an HTML element 
      // and isn't already spaced as a <p>, wrap with a <p> 
      // to put a space from the header
      if (index === 0 && depth === 0 && !child.value.match(/^<p.*>|<\/p>$/g)) {
        // console.log('matched', child.value)
        return createElement("p", null, parse(child.value));
      }
      return parse(child.value);
    default:
      // console.log('text node')
      if (typeof child.text === "string") {
        return /* @__PURE__ */ createElement(Leaf, {
          ...child
        });
      }
  }
};

const Leaf = (props) => {
  // console.log('leaf props', props)
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

export default OPMHTML;