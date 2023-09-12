import { InvoiceDetailInsertReqDto } from "../invoice-detail/invoice-detail-insert.req.dto";

export interface InvoiceInsertReqDto {

	fileExt: string;
	fileName: string;
	supplierId: number;
    invoiceDetails: InvoiceDetailInsertReqDto[];

}