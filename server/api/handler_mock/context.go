package handler_mock

import (
	"errors"
	"io"
	"mime/multipart"
	"net/http"
	"net/url"

	"github.com/labstack/echo/v4"
)

// EchoContextMock
// EchoのContextをモックし、bind関数でerrorを投げるためだけの構造体
type echoContextMockToFailBind struct{}

func NewEchoContextMock() echo.Context {
	return &echoContextMockToFailBind{}
}

func (e echoContextMockToFailBind) Request() *http.Request {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) SetRequest(r *http.Request) {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) SetResponse(r *echo.Response) {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) Response() *echo.Response {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) IsTLS() bool {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) IsWebSocket() bool {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) Scheme() string {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) RealIP() string {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) Path() string {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) SetPath(p string) {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) Param(name string) string {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) ParamNames() []string {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) SetParamNames(names ...string) {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) ParamValues() []string {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) SetParamValues(values ...string) {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) QueryParam(name string) string {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) QueryParams() url.Values {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) QueryString() string {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) FormValue(name string) string {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) FormParams() (url.Values, error) {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) FormFile(name string) (*multipart.FileHeader, error) {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) MultipartForm() (*multipart.Form, error) {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) Cookie(name string) (*http.Cookie, error) {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) SetCookie(cookie *http.Cookie) {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) Cookies() []*http.Cookie {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) Get(key string) interface{} {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) Set(key string, val interface{}) {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) Bind(i interface{}) error {
	return errors.New("bind error")
}

func (e echoContextMockToFailBind) Validate(i interface{}) error {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) Render(code int, name string, data interface{}) error {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) HTML(code int, html string) error {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) HTMLBlob(code int, b []byte) error {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) String(code int, s string) error {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) JSON(code int, i interface{}) error {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) JSONPretty(code int, i interface{}, indent string) error {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) JSONBlob(code int, b []byte) error {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) JSONP(code int, callback string, i interface{}) error {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) JSONPBlob(code int, callback string, b []byte) error {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) XML(code int, i interface{}) error {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) XMLPretty(code int, i interface{}, indent string) error {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) XMLBlob(code int, b []byte) error {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) Blob(code int, contentType string, b []byte) error {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) Stream(code int, contentType string, r io.Reader) error {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) File(file string) error {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) Attachment(file string, name string) error {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) Inline(file string, name string) error {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) NoContent(code int) error {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) Redirect(code int, url string) error {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) Error(err error) {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) Handler() echo.HandlerFunc {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) SetHandler(h echo.HandlerFunc) {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) Logger() echo.Logger {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) SetLogger(l echo.Logger) {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) Echo() *echo.Echo {
	//TODO implement me
	panic("implement me")
}

func (e echoContextMockToFailBind) Reset(r *http.Request, w http.ResponseWriter) {
	//TODO implement me
	panic("implement me")
}
