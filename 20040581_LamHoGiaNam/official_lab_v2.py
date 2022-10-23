# Học thêm tại: https://dash.plotly.com/

# Run this app with `python official_lab_v2.py` and

# visit http://127.0.0.1:8050/ in your web browser.

# BẤM CTRL '+' C ĐỂ TẮT APP ĐANG CHẠY

from dash import Dash, html, dcc
import plotly.express as px
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import firebase_admin
from firebase_admin import credentials, firestore

# TẢI DỮ LIỆU TỪ FIRESTORE


cred = credentials.Certificate("./ltptdl1-be762-firebase-adminsdk-w85zh-92c7cbba4b.json")
app = firebase_admin.initialize_app(cred)
dbFIrestore = firestore.client()


QueryResult = list(dbFIrestore.collection("tbl20040581").stream())
listQurey = list(map(lambda x : x.to_dict(), QueryResult))
df = pd.DataFrame(listQurey)
df = pd.read_csv('orginal_sales_data_edit.csv')
df["YEAR_ID"] = df["YEAR_ID"].astype("str")
df["QTR_ID"] = df["QTR_ID"].astype("str")




# TRỰC QUAN HÓA DỮ LIỆU WEB APP
app = Dash(__name__)

server=app.server

figDoanhSoTheoNam = px.bar(df, x="YEAR_ID", y="SALES",  title='DOANH SỐ BÁN HÀNG THEO NĂM', color='SALES',
labels={'YEAR_ID':'Năm',  'SALES':'DOANH SỐ'})


figTiLeDongGopDanhSoTheoTungDoanhMuc = px.sunburst(df, path=['YEAR_ID', 'CATEGORY'], values='SALES',
color='QUANTITYORDERED',
labels={'parent':'Năm', 'labels':'Quý','QUANTITYORDERED':'Số lượng sản phẩm'},
title='TỈ LỆ ĐÓNG GHÓP CỦA DOANH SỐ THEO DANH MỤC TRONG NĂM')



# Dữ liệu truy vấn 
tongDoanhSo = df['SALES'].sum().round(2)
doanhSoCaoNhat = df['SALES'].max().round(2)

#Tinh loi nhuan
#1 Tính total sale
df['TOTAL_SALES'] = df['QUANTITYORDERED'] * df['PRICEEACH']
#2 Tính lợi nhuận
df['Profit'] = (df['SALES'] - df['TOTAL_SALES']).round(2)
tongLoiNhuan = df['Profit'].sum().round(2)
loiNhuanCaoNhat = df['Profit'].max().round(2)

figTiLeDongGopLoiNhanTheoTungDoanhMuc = px.sunburst(df, path=['YEAR_ID', 'CATEGORY'], values='Profit',
color='Profit',
labels={'parent':'Năm', 'labels':'Quý','QUANTITYORDERED':'Số lượng sản phẩm'},
title='TỈ LỆ ĐÓNG GHÓP CỦA LỢI NHUẬN THEO MỤC TRONG NĂM')


figLoiNhanTheoNam = px.line(data_frame=df, x="YEAR_ID", y="Profit",  title='LỢI NHUẬN BÁN HÀNG THEO NĂM', color='Profit',
labels={'YEAR_ID':'NĂM',  'Profit':'LỢI NHUẬN'})


app.layout = html.Div(
    children=[
        html.Div(
                html.H1(
                    children="DATA DASHBOARD-IUH-DHHTTT16A-20040581-Lâm Hồ Gia Nam", className="header-title"
                ),className="header"
        ),
        html.Div(
            children=[
                html.Div(
                    children=[html.H4("REVENUE: CURRENT MONTH"),
                              html.P(tongDoanhSo)
                    ], className="under__header__item"),
                html.Div(
                     children=[html.H4("HIGHEST SIGNUPS"),
                              html.P(doanhSoCaoNhat)
                    ], className="under__header__item"),
                html.Div(
                     children=[html.H4("TOP MARKETING STRATEGY"),
                              html.P(tongLoiNhuan)
                    ], className="under__header__item"),
                html.Div(
                    children=[html.H4("MAX TEMP: CAMBRIDGE"),
                              html.P(loiNhuanCaoNhat)
                    ], className="under__header__item")
            ]
        ,className="under__header"),
        html.Div(
            children=[
                html.Div(
                    children=dcc.Graph(
                    id='soluong-graph',
                    figure=figDoanhSoTheoNam),
                    className="card"
                ),
                html.Div(
                    children=dcc.Graph(
                    id='doanhso-graph',
                    figure=figTiLeDongGopDanhSoTheoTungDoanhMuc),
                    className="card"
                )
            ], className="wrapper"),
        html.Div(
            children=[
                html.Div(
                    children=dcc.Graph(
                    id='luongdon-graph',
                    figure=figLoiNhanTheoNam),
                    className="card"
                ),
                html.Div(
                    children=dcc.Graph(
                    id='hihi-graph',
                    figure=figTiLeDongGopLoiNhanTheoTungDoanhMuc),
                    className="card"
                )
            ], className="wrapper")
    ])


if __name__ == '__main__':
    app.run_server(debug=True, port=8090)
