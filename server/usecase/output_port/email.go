package output_port

type Email interface {
	Send(mailAddresses []string, subject, body, htmlBody string) error
}
