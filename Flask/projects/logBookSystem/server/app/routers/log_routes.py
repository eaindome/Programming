from app.controllers.log_controller import LogController
from flask import Blueprint, jsonify
from flask_login import login_required

log_bp = Blueprint('log', __name__)
log_controller = LogController()

@log_bp.route('/get-total-logs', methods=['GET'])
@login_required
def get_total_logs():
    result = log_controller.get_total_logs()
    return jsonify(result)

@log_bp.route('/get-recent-logs', methods=['GET'])
@login_required
def get_recent_logs():
    logs = log_controller.get_recent_logs()
    return jsonify(logs)

@log_bp.route('/get-logs-current-year', methods=['GET'])
@login_required
def get_logs_current_year():
    logs = log_controller.get_logs_current_year()
    return jsonify(logs)

@log_bp.route('/get-logs-specific-year/<int:year>', methods=['GET'])
@login_required
def get_logs_specific_year(year):
    logs = log_controller.get_logs_specific_year(year)
    return jsonify(logs)

@log_bp.route('/statistics', methods=['GET'])
@login_required
def get_log_statistics():
    return jsonify({
        'total_logs_count': LogController.get_total_logs_count(),
        'last_week_logs_count': LogController.get_last_week_logs_count(),
        'table_percentages_for_day': LogController.get_table_percentages_for_day(),
        'table_percentages_for_week': LogController.get_table_percentages_for_week(),
        'table_percentages_for_month': LogController.get_table_percentages_for_month(),
        'table_percentages_for_year': LogController.get_table_percentages_for_year(),
    })