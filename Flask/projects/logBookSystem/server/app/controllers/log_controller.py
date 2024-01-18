from app.database import db
from app.database.models.logs_model import Log
from datetime import datetime, date, timedelta
from sqlalchemy import func

class LogController:
    @staticmethod
    def get_total_logs():
        return Log.query.count()

    @staticmethod
    def get_recent_logs():
        today = date.today()
        logs = Log.query.filter(Log.timestamp >= datetime(today.year, today.month, today.day)).all()
        return [log.to_dict() for log in logs]

    @staticmethod
    def get_logs_current_year():
        current_year = date.today().year
        logs = Log.query.filter(db.extract('year', Log.timestamp) == current_year).all()
        return [log.to_dict() for log in logs]

    @staticmethod
    def get_logs_specific_year(year):
        logs = Log.query.filter(db.extract('year', Log.timestamp) == year).all()
        return [log.to_dict() for log in logs]
    
    # statistics
    # 
    @staticmethod
    def get_total_logs_count():
        return Log.query.count()

    @staticmethod
    def get_last_week_logs_count():
        one_week_ago = date.today() - timedelta(days=7)
        return Log.query.filter(Log.timestamp >= one_week_ago).count()

    @staticmethod
    def get_most_common_issue_type():
        result = db.session.query(Log.issue_type, func.count(Log.issue_type)).group_by(Log.issue_type).order_by(func.count(Log.issue_type).desc()).first()
        return result[0] if result else None

    @staticmethod
    def get_table_percentage_for_period(table_name, period_days):
        start_date = date.today() - timedelta(days=period_days)
        total_logs = Log.query.filter(Log.timestamp >= start_date).count()
        table_logs = Log.query.filter(Log.timestamp >= start_date, Log.table_name == table_name).count()
        return (table_logs / total_logs) * 100 if total_logs > 0 else 0

    @staticmethod
    def get_table_percentages_for_period(period_days):
        tables = ['forticlient', 'password_reset', 'vendor_pcs', 'staff_pcs']
        return {table: LogController.get_table_percentage_for_period(table, period_days) for table in tables}

    @staticmethod
    def get_table_percentages_for_day():
        return LogController.get_table_percentages_for_period(1)

    @staticmethod
    def get_table_percentages_for_week():
        return LogController.get_table_percentages_for_period(7)

    @staticmethod
    def get_table_percentages_for_month():
        return LogController.get_table_percentages_for_period(30)

    @staticmethod
    def get_table_percentages_for_year():
        return LogController.get_table_percentages_for_period(365)