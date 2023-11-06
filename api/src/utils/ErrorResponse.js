import HTTP_STATUS_CODE from "../constants/http_code";
const ErrorResponse = (res, err_code, msg = "") => {
  switch (err_code) {
    case HTTP_STATUS_CODE.BAD_REQUEST:
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        error: "Bad request",
        msg: msg,
      });
    case HTTP_STATUS_CODE.UNAUTHORIZED:
      return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({
        error: "Unauthorized",
        msg: msg,
      });
    case HTTP_STATUS_CODE.PAYMENT_REQUIRED:
      return res.status(HTTP_STATUS_CODE.PAYMENT_REQUIRED).json({
        error: "Payment Required",
        msg: msg,
      });
    case HTTP_STATUS_CODE.FORBIDDEN:
      return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({
        error: "Forbidden",
        msg: msg,
      });
    case HTTP_STATUS_CODE.NOT_FOUND:
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
        error: "Not Found",
        msg: msg,
      });
    case HTTP_STATUS_CODE.METHOD_NOT_ALLOWED:
      return res.status(HTTP_STATUS_CODE.METHOD_NOT_ALLOWED).json({
        error: "Method Not Allowed",
        msg: msg,
      });
    case HTTP_STATUS_CODE.NOT_ACCEPTABLE:
      return res.status(HTTP_STATUS_CODE.NOT_ACCEPTABLE).json({
        error: "Not Acceptable",
        msg: msg,
      });
    case HTTP_STATUS_CODE.REQUEST_TIMEOUT:
      return res.status(HTTP_STATUS_CODE.REQUEST_TIMEOUT).json({
        error: "Request Timeout",
        msg: msg,
      });
    case HTTP_STATUS_CODE.CONFLICT:
      return res.status(HTTP_STATUS_CODE.CONFLICT).json({
        error: "Conflict",
        msg: msg,
      });
    case HTTP_STATUS_CODE.GONE:
      return res.status(HTTP_STATUS_CODE.GONE).json({
        error: "Gone",
        msg: msg,
      });
    case HTTP_STATUS_CODE.LENGTH_REQUIRED:
      return res.status(HTTP_STATUS_CODE.LENGTH_REQUIRED).json({
        error: "Length Required",
        msg: msg,
      });
    case HTTP_STATUS_CODE.PRECONDITION_FAILED:
      return res.status(HTTP_STATUS_CODE.PRECONDITION_FAILED).json({
        error: "Precondition Failed",
        msg: msg,
      });
    case HTTP_STATUS_CODE.PAYLOAD_TOO_LARGE:
      return res.status(HTTP_STATUS_CODE.PAYLOAD_TOO_LARGE).json({
        error: "Payload Too Large",
        msg: msg,
      });
    case HTTP_STATUS_CODE.URI_TOO_LONG:
      return res.status(HTTP_STATUS_CODE.URI_TOO_LONG).json({
        error: "URI Too Long",
        msg: msg,
      });
    case HTTP_STATUS_CODE.UNSUPPORTED_MEDIA_TYPE:
      return res.status(HTTP_STATUS_CODE.UNSUPPORTED_MEDIA_TYPE).json({
        error: "Unsupported Media Type",
        msg: msg,
      });
    case HTTP_STATUS_CODE.RANGE_NOT_SATISFIABLE:
      return res.status(HTTP_STATUS_CODE.RANGE_NOT_SATISFIABLE).json({
        error: "Range Not Satisfiable",
        msg: msg,
      });
    case HTTP_STATUS_CODE.EXPECTATION_FAILED:
      return res.status(HTTP_STATUS_CODE.EXPECTATION_FAILED).json({
        error: "Expectation Failed",
        msg: msg,
      });
    case HTTP_STATUS_CODE.UPGRADE_REQUIRED:
      return res.status(HTTP_STATUS_CODE.UPGRADE_REQUIRED).json({
        error: "Upgrade Required",
        msg: msg,
      });
    case HTTP_STATUS_CODE.PRECONDITION_REQUIRED:
      return res.status(HTTP_STATUS_CODE.PRECONDITION_REQUIRED).json({
        error: "Precondition Required",
        msg: msg,
      });
    case HTTP_STATUS_CODE.TOO_MANY_REQUEST:
      return res.status(HTTP_STATUS_CODE.TOO_MANY_REQUEST).json({
        error: "Too Many Requests",
        msg: msg,
      });
    case HTTP_STATUS_CODE.REQUEST_HEADER_FIELD_TOO_LARGE:
      return res.status(HTTP_STATUS_CODE.REQUEST_HEADER_FIELD_TOO_LARGE).json({
        error: "Request Header Fields Too Large",
        msg: msg,
      });
    case HTTP_STATUS_CODE.UNAVAILABLE_FOR_LEGAL_REASONS:
      return res.status(HTTP_STATUS_CODE).json({
        error: "Unavailable For Legal Reasons",
        msg: msg,
      });

    case HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR:
      return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        error: "Internal Server Error",
        msg: msg,
      });
    case HTTP_STATUS_CODE.NOT_IMPLEMENTED:
      return res.status(HTTP_STATUS_CODE.NOT_IMPLEMENTED).json({
        error: "Not Implemented",
        msg: msg,
      });
    case HTTP_STATUS_CODE.BAD_GATEWAY:
      return res.status(HTTP_STATUS_CODE.BAD_GATEWAY).json({
        error: "Bad Gateway",
        msg: msg,
      });
    case HTTP_STATUS_CODE.SERVICE_UNVAILABLE:
      return res.status(HTTP_STATUS_CODE.SERVICE_UNVAILABLE).json({
        error: "Service Unavailable",
        msg: msg,
      });
    case HTTP_STATUS_CODE.GATEWAY_TIMEOUT:
      return res.status(HTTP_STATUS_CODE.GATEWAY_TIMEOUT).json({
        error: "Gateway Timeout",
        msg: msg,
      });
    case HTTP_STATUS_CODE.HTTP_VERSION_NOT_SUPPORTED:
      return res.status(HTTP_STATUS_CODE.HTTP_VERSION_NOT_SUPPORTED).json({
        error: "HTTP Version Not Supported",
        msg: msg,
      });
    case HTTP_STATUS_CODE.VARIANT_ALSO_NEGOTIATES:
      return res.status(HTTP_STATUS_CODE.VARIANT_ALSO_NEGOTIATES).json({
        error: "Variant Also Negotiates",
        msg: msg,
      });
    case HTTP_STATUS_CODE.NOT_EXTENDED:
      return res.status(HTTP_STATUS_CODE.NOT_EXTENDED).json({
        error: "Not Extended",
        msg: msg,
      });
    case HTTP_STATUS_CODE.NETWORK_AUTHENTICATION_REQUIRED:
      return res.status(HTTP_STATUS_CODE.NETWORK_AUTHENTICATION_REQUIRED).json({
        error: "Network Authentication Required",
        msg: msg,
      });

    default:
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        error: "Bad request!",
        msg: msg,
      });
  }
};

export default ErrorResponse;